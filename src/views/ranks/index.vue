<template>
    <div class="ranks-page">
        <!-- <RouterButton
            :buttons="[
                {
                    label: i18n.global.t('menu.rank'),
                    path: '/',
                },
            ]"
        /> -->
        <div class="box-cell"></div>
        <RanksList></RanksList>
    </div>
</template>

<script lang="ts" setup>
// import i18n from '@/lang';
import RanksList from '@/components/ranks-list/index.vue';
</script>

<style lang="scss">
.ranks-page {
    .box-cell {
        height: 40px;
    }
}
</style>
