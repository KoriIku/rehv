import axios, { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import useSWR from 'swr';

type Options = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    timeout?: number;
    // Other GM_xmlhttprequest options
}

interface GMXMLHttpRequestResponse {
    finalUrl: string;
    readyState: number;
    response: any;
    responseText: string;
    responseXML: any;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}

const GM_xmlhttprequest = window.GM_XHR;

// 定义自定义请求函数
function GM_XHR_Adapter(config: AxiosRequestConfig): Promise<AxiosResponse> {
    let url = config.baseURL! + config.url;
    if (config.params) {
        const searchParams = new URLSearchParams(config.params);
        url += '?' + searchParams.toString();
    }
    console.log('到adapter里了'+url);
    return new Promise((resolve, reject) => {
        GM_xmlhttprequest({
            method: config.method,
            url: config.baseURL! + config.url,
            headers: config.headers,
            onload: function (response: GMXMLHttpRequestResponse) {
                // 成功响应
                resolve({
                    data: response.responseText,
                    status: response.status,
                    statusText: response.statusText,  // 加入 statusText 属性
                    headers: response.headers,
                    config: config
                });
            },
            onerror: function (error: any) {
                // 失败响应
                reject(error);
            }
        });
    });
}

// 创建 axios 实例，并指定自定义请求函数
const instance = axios.create({
    baseURL: 'https://e-hentai.org',  // 指定域名
    headers: {
        'Cookie': ''  // 指定 Cookie
    },
    adapter: GM_XHR_Adapter
});



export function useSWRandAxios(path: string, params?: any){
    console.log('useSWRandAxios');
    function fetchData() {
        console.log('到fetch里了');
        return instance.get(path,{params:params}).then(res => res.data);  // 使用 params 选项指定查询参数
    }

    return useSWR([path, {params:params}], fetchData, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
}
