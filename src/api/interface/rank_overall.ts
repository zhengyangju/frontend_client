export namespace RankOverall {
    export interface RankOverallInfo {
        headshot: string;
        name: string;
        ballot: number;
        character: number;
        is_followed: boolean;
        is_liked: boolean;
    }

    export interface RankOverallList {
        rank_type: number;
        celebrities: Array<RankOverallInfo>[];
    }
}
