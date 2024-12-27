declare interface NodeModel extends BaseInterface {
    parentId?: string,
    name?: string,
    isDir?: boolean,
    content?: string,
    children?: any[],
    img?: string,
    modifTime?: string,
    size?: number,
    uuid?: string
}