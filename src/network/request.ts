import axios, {AxiosResponse} from 'axios'
import qs from "qs"
import {requestInterceptor, responseInterceptor} from "@/network/interceptor";

const instance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    timeout: 3000,
})
instance.interceptors.request.use(requestInterceptor)
instance.interceptors.response.use(responseInterceptor)
export default  {
    httpPost(url:string,data:string|object|undefined|null={},header?:object) {
        return instance.post(url,data,{
            headers:{
                ...header,
                "content-type":"application/json;charset=utf8;",
            }
        }).then((res:AxiosResponse) => {
            return res.data as ResultData
        })
    },
    httpGet(url:string,data:string|object|undefined|null={},header?:object) {
        return instance.get(url, {
            data: qs.stringify(data),
            headers:{
                ...header,
                "content-type":"application/json;charset=utf8;",
            }
        }).then((res:AxiosResponse) => {
            return res.data as ResultData
        })
    }

}