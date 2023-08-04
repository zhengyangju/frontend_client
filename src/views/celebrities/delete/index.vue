<template>
    <el-dialog
        v-model="open"
        :close-on-click-modal="false"
        :title="$t('celebrities.delete_celebrity')"
        width="30%"
        :before-close="handleClose"
        center
    >
        <p style="text-align: center">{{ $t('celebrities.confirm_delete') }}</p>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose" :disabled="loading">{{ $t('commons.button.cancel') }}</el-button>
                <el-button type="primary" @click="submit()" :disabled="loading">
                    {{ $t('commons.button.confirm') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import i18n from '@/lang';
import { ref, reactive } from 'vue';
import { MsgSuccess } from '@/utils/message';

let open = ref(false);
import { deleteCelebrityDetail } from '@/api/modules/celebrity';
let data = reactive({
    row: {},
});
let loading = ref(false);
const em = defineEmits(['close', 'call-back']);

const handleClose = () => {
    open.value = false;
};

const acceptParams = async (row) => {
    data.row = row;
    open.value = true;
};

const submit = () => {
    loading.value = true;
    deleteCelebrityDetail(data.row)
        .then(() => {
            em('call-back');
            handleClose();
            MsgSuccess(i18n.global.t('commons.msg.deleteSuccess'));
        })
        .finally(() => {
            loading.value = false;
        });
};

defineExpose({
    acceptParams,
});
</script>
