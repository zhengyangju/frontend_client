<template>
    <div>
        <RouterButton :buttons="buttons" />
        <LayoutContent>
            <router-view></router-view>
        </LayoutContent>
    </div>
</template>

<script lang="ts" setup>
import i18n from '@/lang';
const buttons = [
    {
        label: i18n.global.t('celebrityCharacter.character'),
        path: '/celebrity-character/list',
    },
];
</script>
