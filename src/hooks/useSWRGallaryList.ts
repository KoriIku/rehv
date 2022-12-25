import cheerio from 'cheerio';
import useSWR from 'swr';

type Options = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    timeout?: number;
    // Other GM_xmlhttprequest options
}

const GM_xmlhttprequest = window.GM_XHR;

export function useSWRWithGM(
    path: string,
    cookies: string = '',
    params: string | string[][] | Record<string, string> | URLSearchParams | undefined = undefined,
    options: Options = { method: 'GET' },
){
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
