import http from '@/api';
import { ResPage } from '@/api/interface';
import { User } from '@/api/interface/user';

export const getUserPage = (params: User.SearchUserPage) => {
    return http.get<ResPage<User.UserInfo>>(`/managers/users`, params);
};
export const getUserDetail = (params: User.ReqUser) => {
    return http.get(`/managers/${params.id}`);
};
export const editUserDetail = (params: User.UserAdd) => {
    return http.put(`/managers/${params.id}`, params);
};
export const addUserDetail = (params: User.UserAdd) => {
    return http.post(`/managers`, params);
};
