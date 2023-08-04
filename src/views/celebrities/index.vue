<template>
    <div>
        <div v-if="showButton">
            <RouterButton :buttons="buttons" />
        </div>
        <LayoutContent>
            <router-view></router-view>
        </LayoutContent>
    </div>
</template>

<script lang="ts" setup>
import i18n from '@/lang';
import { onMounted, ref } from 'vue';
import bus from './bus';
let showButton = ref(true);
const buttons = [
    {
        label: i18n.global.t('celebrities.entertainment'),
        path: '/celebrities/entertainment',
    },
    {
        label: i18n.global.t('celebrities.lifeCategory'),
        path: '/celebrities/life',
    },
    {
        label: i18n.global.t('celebrities.gameCategory'),
        path: '/celebrities/game',
    },
    {
        label: i18n.global.t('celebrities.knowledgeCategory'),
        path: '/celebrities/knowledge',
    },
];

onMounted(() => {
    bus.on('upgrade', () => {
        showButton.value = false;
    });
});
</script>
