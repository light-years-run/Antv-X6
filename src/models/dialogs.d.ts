// 返回值类型
declare type DialogCallbackPromise = Promise<any>
// inject类型
declare type DialogFunctionType = (title:string,params:any)=>DialogResultPromise
