import http from '@/api';
import { RankOverall } from '../interface/rank_overall';

export const getRankList = () => {
    return http.get<Array<RankOverall.RankOverallList>>(`/ranks/overall`);
};
