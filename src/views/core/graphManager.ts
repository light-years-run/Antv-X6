import { Graph, Cell, Shape } from "@antv/x6";
import { Dnd } from '@antv/x6-plugin-dnd'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'

export class GraphManager {
    graph?: Graph
    graphContainerId?:string
    dndContainerId?: string
    wrapDom?:HTMLElement
    dnd: Dnd;     
    constructor(graphId: string, dndId: string) {
        this.graphContainerId = graphId
        this.dndContainerId = dndId
        this.wrapDom = document.getElementById(this.graphContainerId!)!
        if (this.graph) {
            this.graph.dispose()
        }
        let container = document.getElementById(this.graphContainerId);
        let dndContainer:any = document.getElementById(this.dndContainerId)
        this.graph = new Graph({
            container: container!,
            grid: true,
            autoResize: true,
            panning: {
                enabled: false,
                eventTypes: ['leftMouseDown'],
            },
            mousewheel: {
                enabled: true,
                zoomAtMousePosition: true,
                modifiers: 'ctrl',
                minScale: 0.5,
                maxScale: 3,
            },
            connecting: {
                router: 'manhattan',
                connector: {
                    name: 'rounded',
                    args: {
                        radius: 8,
                    },
                },
                anchor: 'center',
                connectionPoint: 'anchor',
                allowBlank: false,
                snap: {
                    radius: 20,
                },
                createEdge() {
                    return new Shape.Edge({
                        attrs: {
                            line: {
                                stroke: '#A2B1C3',
                                strokeWidth: 2,
                                targetMarker: {
                                    name: 'block',
                                    width: 12,
                                    height: 8,
                                },
                            },
                        },
                        zIndex: 0,
                    })
                },
                validateConnection({ targetMagnet }) {
                    return !!targetMagnet
                },
            },
            highlighting: {
                magnetAdsorbed: {
                    name: 'stroke',
                    args: {
                        attrs: {
                            fill: '#5F95FF',
                            stroke: '#5F95FF',
                        },
                    },
                },
            },
        });
        //初始化Dnd
        this.dnd = new Dnd({
            target: this.graph,
            scaled: false,
            dndContainer,
            getDragNode: (node) => node.clone({ keepId: true }),
        })
        this.graph.enablePanning
        this.init();
    }
    init() {
        this.initPlugin();
        this.bindKey();
    }
    initPlugin() {
        if (null == this.graph)
            return;
        this.graph
            .use(
                new Transform({
                    resizing: true,
                    rotating: true,
                }),
            )
            .use(
                new Selection({
                    enabled: true,
                    rubberband: true,
                    showNodeSelectionBox: true,
                }),
            )
            .use(
                new Snapline({
                    enabled: true,
                }),
            )
            .use(
                new Keyboard({
                    enabled: true,
                }),
            )
            .use(
                new Clipboard({
                    enabled: true,
                }),
            )
            .use(
                new History({
                    enabled: true,
                    beforeAddCommand(event, args: any) {
                        if (args.key === 'ports' || args.key === 'target') {
                            return false
                        }
                        if (args.options) {
                            return args.options.ignore !== false
                        }
                    }
                }),
            )
    }

    bindKey() {
        if (null == this.graph)
            return;
        this.graph.bindKey(['meta+c', 'ctrl+c'], () => {
            const cells = this.graph!.getSelectedCells()
            if (cells.length) {
                this.graph!.copy(cells)
            }
            return false
        })
        this.graph.bindKey(['meta+x', 'ctrl+x'], () => {
            const cells = this.graph!.getSelectedCells()
            if (cells.length) {
                this.graph!.cut(cells);
            }
            return false
        })

        this.graph.bindKey(['meta+v', 'ctrl+v'], () => {
            if (!this.graph!.isClipboardEmpty()) {
                const cells = this.graph!.paste({ offset: 32 })
                if (cells.length) {
                    this.graph!.cleanSelection()
                    this.graph!.select(cells)
                }
            }
            return false
        })

        // undo redo
        this.graph.bindKey(['meta+z', 'ctrl+z'], () => {
            if (this.graph!.canUndo()) {
                this.graph!.undo()
            }
            return false
        })
        this.graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
            if (this.graph!.canRedo()) {
                this.graph!.redo()
            }
            return false
        })

        // select all
        this.graph.bindKey(['meta+a', 'ctrl+a'], () => {
            const nodes = this.graph!.getNodes()
            if (nodes) {
                this.graph!.select(nodes)
            }
        })

        // delete
        this.graph.bindKey('delete', () => {
            const cells = this.graph!.getSelectedCells()
            if (cells.length) {
                this.graph!.removeCells(cells)
            }
        })

        // zoom
        this.graph.bindKey(['alt+1', 'meta+1'], () => {
            const zoom = this.graph!.zoom()
            if (null != zoom && zoom < 1.5) {
                this.graph!.zoom(0.1)
            }
        })
        this.graph.bindKey(['alt+2', 'meta+2'], () => {
            const zoom = this.graph!.zoom()
            if (null != zoom && zoom > 0.5) {
                this.graph!.zoom(-0.1)
            }
        })
    }
    onNodeSelected(callback:(args:{ e:any, x:number, y:number, cell:Cell, view:any, toolsBarShow:string }, eventKey: string)=>void) {
        this.graph!.on('node:click', (res:any) => {
            callback(res, 'node:click')
        })
        this.graph!.on('edge:click', (res:any) => {
            callback(res, 'edge:click')
        })
        this.graph!.on('cell:selected', (res:any) => {
            callback(res, 'node:click')
        })
    }
    onCellMouseMove(callback:(args:{ e:any, x:number, y:number, cell:Cell, view:any, toolsBarShow:string }, eventKey: string)=>void){
        this.graph!.on('cell:mouseenter', (res:any) => {
            callback(res, 'cell:mouseenter')
        })
        this.graph!.on('cell:mouseleave', (res:any) => {
            callback(res, 'cell:mouseleave')
        })
    }
    onClickedGraphBlank(callback:(args:{ toolsBarShow: any; e:any, x:number, y:number, cell:Cell, view:any }, eventKey: string)=>void) {
        this.graph!.on('blank:click', (res:any) => {
            callback(res,'blank:click')
        })
    }
    onClickMouseRightBtn(callback:(args:{ toolsBarShow: any; e:any, x:number, y:number, cell:Cell, view:any }, eventKey: string)=>void) {
        this.graph!.on('node:contextmenu', (res:any) => {
            callback(res,'node')
        })
        this.graph!.on('node:port:contextmenu', (res:any) => {
            callback(res,'port')
        })
        this.graph!.on('edge:contextmenu', (res:any) => {
            callback(res,'edge')
        })
        this.graph!.on('blank:contextmenu', (res:any) => {
            callback(res,'blank')
        })
    }

    invoke(handler:string,arg?:any){
        if(!handler || !this.graph) return
        if(handler in this.graph && typeof this.graph[handler as keyof typeof this.graph] === 'function'){
           return this.graph[handler as keyof typeof this.graph](arg,null)
        } else {
           return this.graph!.invoke(handler,arg)
        }
    }
    
    dndStartDrag(evt:MouseEvent, item:any) {
        const node = this.graph!.createNode({
            //shape:"path",
            //shape:"rect",
            x: 100,
            y: 100,
            width: item.width,
            height: item.height,
            
            markup:item.graph.markup,
            attrs:item.graph.attrs,
            
        })
        //this.graph!.dndStart(node, evt)
        this.dnd.start(node,evt)
    }
    
}