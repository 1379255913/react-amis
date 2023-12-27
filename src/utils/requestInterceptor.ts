import axios, {AxiosRequestConfig} from 'axios';
import {toast} from "amis";

/**
 * 这里编写响应转化器，将数据转化为amis要求的格式
 * @param data
 */
function transformResponse(data: any) {
    return {
        status: data.base.code === 10000 ? 0 : data.base.code,
        base: data.base,
        msg: data.base.msg,
        data: data.data || {},
    }
}


/**
 * 全局请求拦截，方便对错误进行统一处理
 * @param config
 */
export function request(config: AxiosRequestConfig) {
    let instance = axios.create();
    return new Promise((resolve, reject) => {
        let onSuccess = (res:any) => {
            res.data = transformResponse(res.data);
            if (res.data == null) {
                console.log("reject data")
                reject(res);
            } else if (res.data.base.code == 10004) {
                // 未登陆
                console.log("redirect url", res.data.redirectUrl)
                window.location.href = res.data.redirectUrl;
            } else if (res.data.base.code == 10003) {
                // 无权限
                console.log("not permission, url", config.url);
                toast['error']('您无访问权限，请申请！', '消息');
                reject(res);
            } else {
                resolve(res)
            }
        }

        let onFail = (error:any) => {
            error.data = transformResponse(error.data);
            console.log("onFail", error)
            reject(error);
        }
        return instance.request(config)
            .then(onSuccess, onFail)
            .catch(onFail);
    })
}
