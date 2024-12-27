export function getNodeCoord(node:any){
    if(!node.position) return
    return node.position()
}
  
export function setNodeCoord(node:any, x:number, y:number){
    if(!node.position) return
    node.position(x,y)
}

export function algin(cells:any, alginType:string){
    
}