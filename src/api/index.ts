import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResultData } from '@/api/interface';
import { ResultEnum } from '@/enums/http-enum';
import { checkStatus } from './helper/check-status';
import router from '@/routers';
import { GlobalStore } from '@/store';
import { MsgError } from '@/utils/message';

const globalStore = GlobalStore();

const config = {
    baseURL: import.meta.env.VITE_API_URL as string,
    timeout: ResultEnum.TIMEOUT as number,
    withCredentials: true,
};

class RequestHttp {
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        this.service = axios.create(config);
        let language = globalStore.language === 'tw' ? 'zh-Hant' : globalStore.language;
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                config.headers = {
                    // 'X-CSRF-TOKEN': globalStore.tokenType + ' ' + globalStore.csrfToken,
                    // Authorization: globalStore.tokenType + ' ' + globalStore.csrfToken,
                    'Accept-Language': language,
                    ...config.headers,
                };
                return {
                    ...config,
                };
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            },
        );

        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data: rdata, status, statusText, headers } = response;
                const data = {
                    data: rdata,
                    code: status,
                    statusText,
                    message: statusText,
                };
                if (rdata.access_token) {
                    globalStore.setCsrfToken(rdata.access_token);
                    globalStore.setTokenType(rdata.token_type);
                }
                if (data.code == ResultEnum.OVERDUE || data.code == ResultEnum.FORBIDDEN) {
                    globalStore.setLogStatus(false);
                    router.push({
                        name: 'entrance',
                        params: { code: globalStore.entrance },
                    });
                    return Promise.reject(data);
                }
                if (data.code == ResultEnum.EXPIRED) {
                    router.push({ name: 'Expired' });
                    return data;
                }
                if (data.code == ResultEnum.ERRIP) {
                    globalStore.setLogStatus(false);
                    router.push({
                        name: 'entrance',
                        params: { code: 'err-ip' },
                    });
                    return Promise.reject(data);
                }
                if (data.code == ResultEnum.ERRDOMAIN) {
                    globalStore.setLogStatus(false);
                    router.push({
                        name: 'entrance',
                        params: { code: 'err-domain' },
                    });
                    return Promise.reject(data);
                }
                if (data.code == ResultEnum.ERRGLOBALLOADDING) {
                    globalStore.setGlobalLoading(true);
                    globalStore.setLoadingText(data.message);
                    return;
                } else {
                    if (globalStore.isLoading) {
                        globalStore.setGlobalLoading(false);
                    }
                }
                if (data.code == ResultEnum.ERRAUTH) {
                    return data;
                }
                if (data.code && data.code !== ResultEnum.SUCCESS) {
                    MsgError(data.message);
                    return Promise.reject(data);
                }
                if (headers['content-disposition'] !== undefined) {
                    return {
                        response,
                        headers,
                    };
                }
                return data;
            },
            async (error: AxiosError) => {
                const { response } = error;
                console.log(response); //404
                if (error.message.indexOf('timeout') !== -1) MsgError('请求超时！请您稍后重试');
                if (response) {
                    checkStatus(
                        response.status,
                        response.data && response.data['message']
                            ? response.data['message']
                            : response.data['msg']
                            ? response.data['msg']
                            : '',
                    );
                }
                if (!window.navigator.onLine) router.replace({ path: '/500' });
                return Promise.reject(error);
            },
        );
    }

    get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.get(url, { params, ..._object });
    }
    post<T>(url: string, params?: object, timeout?: number): Promise<ResultData<T>> {
        return this.service.post(url, params, {
            baseURL: import.meta.env.VITE_API_URL as string,
            timeout: timeout ? timeout : (ResultEnum.TIMEOUT as number),
            withCredentials: true,
        });
    }
    put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.put(url, params, _object);
    }
    delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
        return this.service.delete(url, { params, ..._object });
    }
    download<BlobPart>(url: string, params?: object, _object = {}): Promise<BlobPart> {
        return this.service.post(url, params, _object);
    }
    upload<T>(url: string, params: object = {}, config?: AxiosRequestConfig): Promise<T> {
        return this.service.post(url, params, config);
    }
    uploadPut<T>(url: string, params: object = {}, config?: AxiosRequestConfig): Promise<T> {
        return this.service.put(url, params, config);
    }
}

export default new RequestHttp(config);
