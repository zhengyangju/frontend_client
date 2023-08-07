import { ReqPage } from '.';

export namespace Celebrities {
    export interface CelebrityInfo {
        headshot: string;
        name: string;
        address: string;
        sex: number;
        ballot: number;
        remark: string;
        character: number;
        id: string;
        is_followed: boolean;
        is_liked: boolean;
    }

    export interface CelebrityCharacterInfo {
        name: string;
        id?: string;
    }

    export interface ReqCelebrity {
        id: string;
        is_followed?: boolean;
        is_liked?: boolean;
    }

    export interface CelebrityDetail {
        headshot: string;
        name: string;
        address: string;
        sex: number;
        ballot: number;
        remark: string;
        character: string;
        id: string;
        contact_information: string;
        tik_tok_link: string;
        little_red_book_link: string;
        bilibili_link: string;
        weibolntl_link: string;
        description: string;
    }

    export interface SearchCelebrityPage extends ReqPage {
        character: string;
        name?: string;
        sex?: string;
        orders?: Array<string>[];
    }

    export interface SearchCelebrityCharacterPage extends ReqPage {
        name?: string;
        is_page?: boolean;
    }
}
