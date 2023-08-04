import { File } from '@/api/interface/file';
import http from '@/api';
import { AxiosRequestConfig } from 'axios';

export const UploadImageFileData = (params: FormData, config: AxiosRequestConfig) => {
    return http.uploadPut<File.File>('images/upload', params, config);
};
