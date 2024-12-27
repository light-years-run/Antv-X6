import settings from '@/views/core/settings'
const { toolbarState, portsStyle, rightBtnMenu } = settings

export function getToolsBtnState(args: any, eventKey: string){
    let stateList = toolbarState['blank']
    if(!eventKey) return stateList
    let eventChain = eventKey.split(':')
    if(eventChain.includes('click')){
        if(args.node) {
            hiddenPorts(args.node)
        }
        stateList = toolbarState[eventChain[0] as keyof typeof toolbarState] || stateList
        return stateList
    } 
}

export function triggerPorts(args: any, eventKey: string){
    if(!args.node) return
    if (eventKey.includes('mouseenter')){
        showPorts(args.node)
    } else {
        hiddenPorts(args.node)
    }
}

function showPorts(node: any){
    let ports = node.port!.ports || []
    ports.forEach((item:any) => {
        node.portProp!(item.id, 'attrs/circle/strokeWidth', portsStyle.width);
        node.portProp!(item.id, 'attrs/circle/fill', portsStyle.fill);
    })
}

function hiddenPorts(node: any){
    let ports = node.port!.ports || []
    ports.forEach((item:any) => {
        node.portProp!(item.id, 'attrs/circle/strokeWidth', 0);
        node.portProp!(item.id, 'attrs/circle/fill', 'none');
    })
}

export function getRightBtnMenu(args: any, eventKey: string){
    let menu = rightBtnMenu[eventKey as keyof typeof rightBtnMenu] || rightBtnMenu['default']
    let {x,y} = args
    return {
        show: true,
        menu,
        coord:{x,y}
    }
}




