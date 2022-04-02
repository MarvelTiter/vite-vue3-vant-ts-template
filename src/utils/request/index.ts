import store from "@/store";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosModule } from "./axios";
import ph from "@/utils/request/parameterHandle";
import { HttpProxy } from "vite";


function requestInterceptors(config: AxiosRequestConfig<any>): AxiosRequestConfig<any> {
    if (store.state.app.token) {
    }
    let data = config.data;
    console.debug(`request: ${config.url} data:`, data)
    if (data) config.data = ph.ConstructParam(data)
    return config
}

function responseInterceptors(res: AxiosResponse<any>): AxiosResponse<any> {
    console.log('responseInterceptors res: ', res);
    res.data = ph.ResoleData(res.data)
    return res
}

function requestInterceptorsCatch(error: Error) {
    console.log("request Error", error); // for debug
    return Promise.reject(error);
}

function responseInterceptorsCatch(res: AxiosResponse<any>, error: Error) {
    console.log("response Error" + error); // for debug    
    return Promise.reject(error);
}

function createAxios() {
    return new AxiosModule({
        requestInterceptors: requestInterceptors,
        responseInterceptors: responseInterceptors,
        requestInterceptorsCatch: requestInterceptorsCatch,
        responseInterceptorsCatch: responseInterceptorsCatch,
        timeout: 10 * 1000,
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    })
}

export const defaultHttp = createAxios();
