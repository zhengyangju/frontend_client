export namespace Login {
    export interface ReqLoginForm {
        username: string;
        password: string;
        ignoreCaptcha: boolean;
        captcha: string;
        captchaID: string;
        authMethod: string;
    }
    export interface MFALoginForm {
        username: string;
        password: string;
        code: string;
        authMethod: string;
    }
    export interface ResLogin {
        username: string;
        token: string;
        mfaStatus: string;
    }
    export interface ResCaptcha {
        imagePath: string;
        captchaID: string;
        captchaLength: number;
    }
    export interface ResAuthButtons {
        [propName: string]: any;
    }
}
