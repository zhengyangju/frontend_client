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
        label: i18n.global.t('users.userlist'),
        path: '/users/userlist',
    },
];
</script>
