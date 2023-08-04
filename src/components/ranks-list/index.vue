<template>
    <el-row :gutter="5" class="rank-box">
        <el-col class="app-col-12" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="app-card top-list">
                <el-row class="top-header">
                    <el-col>
                        <div class="app-title">{{ $t('rank.day') }}</div>
                        <el-text type="success" class="app-title-info">今日榜单</el-text>
                    </el-col>
                </el-row>
                <div class="top-content">
                    <div class="rank-line" v-for="(item, index) in rankList.list1" :key="item.name">
                        <div class="left">
                            <span :class="`top${index + 1} top-error`">{{ index + 1 }}</span>
                            <el-avatar shape="circle" :size="50" :src="item.headshot" />
                            <el-text class="app-title-info">{{ item.name }}</el-text>
                        </div>
                        <div class="ballot">{{ $t('celebrities.calc_ballot', { total: item.ballot }) }}</div>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col class="app-col-12" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="app-card top-list">
                <el-row class="top-header rank-week">
                    <el-col>
                        <div class="app-title">{{ $t('rank.week') }}</div>
                        <el-text type="success" class="app-title-info">本周榜单</el-text>
                    </el-col>
                </el-row>
                <div class="top-content">
                    <div class="rank-line" v-for="(item, index) in rankList.list2" :key="item.name">
                        <div class="left">
                            <span :class="`top${index + 1} top-error`">{{ index + 1 }}</span>
                            <el-avatar shape="circle" :size="50" :src="item.headshot" />
                            <el-text class="app-title-info">{{ item.name }}</el-text>
                        </div>
                        <div class="ballot">{{ $t('celebrities.calc_ballot', { total: item.ballot }) }}</div>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col class="app-col-12" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <div class="app-card top-list" shadow="hover">
                <el-row class="top-header rank-month">
                    <el-col>
                        <div class="app-title">{{ $t('rank.month') }}</div>
                        <el-text type="success" class="app-title-info">本月榜单</el-text>
                    </el-col>
                </el-row>
                <div class="top-content">
                    <div class="rank-line" v-for="(item, index) in rankList.list3" :key="item.name">
                        <div class="left">
                            <span :class="`top${index + 1} top-error`">{{ index + 1 }}</span>
                            <el-avatar shape="circle" :size="50" :src="item.headshot" />
                            <el-text class="app-title-info">{{ item.name }}</el-text>
                        </div>
                        <div class="ballot">{{ $t('celebrities.calc_ballot', { total: item.ballot }) }}</div>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { getRankList } from '@/api/modules/ranks_overall';

let rankList = reactive({
    list: [],
    list1: [],
    list2: [],
    list3: [],
});

const getRanksList = () => {
    getRankList().then((res) => {
        const { data } = res;
        data.some((item) => {
            if (item.rank_type === 1) {
                rankList.list1 = item.celebrities;
            }
            if (item.rank_type === 2) {
                rankList.list2 = item.celebrities;
            }
            if (item.rank_type === 3) {
                rankList.list3 = item.celebrities;
            }
        });
        console.log(rankList);
    });
};
onMounted(() => {
    getRanksList();
});
</script>
<style lang="scss">
.rank-box {
    margin-bottom: 20px;
    --el-card-border-radius: 10px;
    --el-card-padding: 12px;
    .app-card {
        margin-top: 10px;
        padding: 5px;
        border-radius: var(--el-card-border-radius);
        background: white;
        &.top-list {
            transition: var(--el-transition-duration);
            border: var(--panel-border) !important;
            box-shadow: var(--el-box-shadow-light);
            padding: 0px;
            margin: 5px;

            &:hover {
                border: 1px solid var(--el-color-primary) !important;
            }
        }

        .top-header {
            background: #6f75d7;
            height: 108px;
            padding: 10px 20px 10px 20px;
            border-radius: var(--el-card-border-radius); //6px;
            color: #fff;
            &.rank-week {
                background: #f2b569;
            }
            &.rank-month {
                background: #f5777c;
            }
            .app-title {
                font-weight: 500;
                font-size: 26px;
                // color: var(--el-text-color-regular);
            }
            .app-title-info {
                display: inline-block;
                width: 100%;
                text-align: center;
                color: white;
            }
        }

        .top-content {
            padding: 10px 20px 10px 20px;
            min-height: 60px;
            cursor: pointer;
            .rank-line {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 0px;
                &:not(:last-child) {
                    border-bottom: 1px solid whitesmoke;
                }
                div.left {
                    display: flex;
                    align-items: center;
                    flex: 3;
                }
                .ballot {
                    color: #999;
                    flex: 1;
                    text-align: right;
                }
                .app-title-info {
                    display: inline-block;
                    width: 50%;
                    text-align: center;
                }
            }
        }

        .top-error {
            float: left;
            display: inline-block;
            width: 26px;
            height: 36px;
            margin: 9px 15px 12px 0;
            line-height: 42px;
            text-align: center;
            color: #fff;
            background: url(../../assets/images/icons-tops.png) no-repeat -133px 0;
            background-size: 158px 36px;
        }

        .top1 {
            float: left;
            display: inline-block;
            width: 26px;
            height: 36px;
            margin: 9px 15px 12px 0;
            line-height: 42px;
            text-align: center;
            color: #fff;
            background: url(../../assets/images/icons-tops.png) no-repeat 0px 0;
            background-size: 158px 36px;
        }
        .top2 {
            float: left;
            display: inline-block;
            width: 26px;
            height: 36px;
            margin: 9px 15px 12px 0;
            line-height: 42px;
            text-align: center;
            color: #fff;
            background: url(../../assets/images/icons-tops.png) no-repeat -44px 0;
            background-size: 158px 36px;
        }
        .top3 {
            float: left;
            display: inline-block;
            width: 26px;
            height: 36px;
            margin: 9px 15px 12px 0;
            line-height: 42px;
            text-align: center;
            color: #fff;
            background: url(../../assets/images/icons-tops.png) no-repeat -88px 0;
            background-size: 158px 36px;
        }
        .top4 {
            float: left;
            display: inline-block;
            width: 26px;
            height: 36px;
            margin: 9px 15px 12px 0;
            line-height: 42px;
            text-align: center;
            color: #fff;
            background: url(../../assets/images/icons-tops.png) no-repeat -133px 0;
            background-size: 158px 36px;
        }
    }
}
</style>
