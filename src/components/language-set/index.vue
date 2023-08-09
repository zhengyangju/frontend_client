<template>
    <div class="language-box">
        <el-dropdown @command="handleCommand" v-show="true">
            <span>
                {{ dropdownText }}
                <el-icon>
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="item in languageList.list" :key="item.value" :command="item.value">
                        {{ item.label }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { GlobalStore } from '@/store';
import { useI18n } from 'vue-i18n';

const usei18n = useI18n();
const globalStore = GlobalStore();
const languageList = reactive({
    list: [
        {
            label: '中文(简体)',
            value: 'zh',
        },
        {
            label: 'English',
            value: 'en',
        },
    ],
});
const dropdownText = ref('中文(简体)');

function handleCommand(command: string) {
    globalStore.updateLanguage(command);
    usei18n.locale.value = command;
    dropdownText.value = languageList.list.find((item) => item.value === command)['label'];
}
onMounted(() => {
    usei18n.locale.value = globalStore.language;
    dropdownText.value = languageList.list.find((item) => item.value === globalStore.language)['label'];
});
</script>

<style lang="scss" scoped>
.language-box {
    padding: 20px 20px 0px 20px;
    .el-tooltip__trigger:focus-visible {
        outline: -webkit-focus-ring-color auto 0px;
    }
}
</style>
