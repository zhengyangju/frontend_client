import { ReqPage } from '.';

export namespace User {
    export interface UserInfo {
        /**
         * 更新时间
         */
        create_time?: string;
        /**
         * 创建人
         */
        creator?: string;
        /**
         * 邮箱
         */
        email?: string;
        /**
         * ID
         */
        id?: string;
        /**
         * 上次登录时间
         */
        last_login_time?: string;
        /**
         * 上次登出时间
         */
        last_logout_time?: string;
        /**
         * 手机号
         */
        phone?: string;
        /**
         * 性别: 男--1, 女--2
         */
        sex?: number;
        /**
         * 创建时间
         */
        update_time?: string;
        /**
         * 用户名
         */
        username: string;
    }

    export interface ReqUser {
        id: string;
    }

    export interface UserDetail {
        /**
         * 更新时间
         */
        create_time?: string;
        /**
         * 创建人
         */
        creator?: string;
        /**
         * 邮箱
         */
        email?: string;
        /**
         * ID
         */
        id?: string;
        /**
         * 上次登录时间
         */
        last_login_time?: string;
        /**
         * 上次登出时间
         */
        last_logout_time?: string;
        /**
         * 手机号
         */
        phone?: string;
        /**
         * 性别: 男--1, 女--2
         */
        sex?: number;
        /**
         * 创建时间
         */
        update_time?: string;
        /**
         * 用户名
         */
        username: string;
    }

    export interface UserAdd {
        email?: string;

        password?: string;

        phone?: string;

        sex?: number;

        username: string;

        id?: string;
    }

    export interface SearchUserPage extends ReqPage {
        name?: string;
        sex?: string;
        orders?: Array<string>[];
    }
}
