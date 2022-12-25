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
        return instance.get(path).then(res => res.data);  // 使用 params 选项指定查询参数
    }

    return useSWR([path, params], fetchData, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
}

export function useSWRWithGM(
    path: string,
    cookies: string = '',
    params: string | string[][] | Record<string, string> | URLSearchParams | undefined = undefined,
    options: Options = { method: 'GET' },
) {
    function fetchWithGM() {
        console.log('执行swr');
        const domain = "https://e-hentai.org"
        let url = domain + path;
        if (params) {
            const searchParams = new URLSearchParams(params);
            url += '?' + searchParams.toString();
        }

        return new Promise<any>((resolve, reject) => {
            GM_xmlhttprequest({
                method: options.method,
                url,
                headers: {
                    'Cookie': cookies,
                },
                ...options,
                onload(response: { status: number; responseText: string | Buffer; statusText: string | undefined; }) {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(response.responseText);
                    } else {
                        reject(new Error(response.statusText));
                    }
                },
                onerror(error: any) {
                    reject(error);
                },
            });
        });
    }

    // 禁用掉了焦点切换获取数据，理论上来讲不需要
    return useSWR(path, fetchWithGM, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
}
