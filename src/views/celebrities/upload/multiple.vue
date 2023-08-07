<template>
    <el-drawer
        v-model="open"
        :before-close="handleClose"
        size="40%"
        :destroy-on-close="true"
        :close-on-click-modal="false"
    >
        <template #header>
            <DrawerHeader :header="$t('file.upload')" :back="handleClose" />
        </template>
        <el-upload
            action="#"
            drag
            :auto-upload="false"
            ref="uploadRef"
            :on-change="fileOnChange"
            :on-exceed="handleExceed"
            :on-success="hadleSuccess"
            show-file-list
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                {{ $t('database.dropHelper') }}
                <em>{{ $t('database.clickHelper') }}</em>
            </div>
            <template #tip>
                <el-text>{{ uploadHelper }}</el-text>
                <el-progress v-if="loading" text-inside :stroke-width="20" :percentage="uploadPrecent"></el-progress>
            </template>
        </el-upload>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose" :disabled="loading">{{ $t('commons.button.cancel') }}</el-button>
                <el-button type="primary" @click="submit()" :disabled="loading || uploaderFiles.length == 0">
                    {{ $t('commons.button.confirm') }}
                </el-button>
            </span>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UploadFile, UploadFiles, UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
import i18n from '@/lang';
import DrawerHeader from '@/components/drawer-header/index.vue';
import { MsgSuccess } from '@/utils/message';

const uploadRef = ref<UploadInstance>();
const loading = ref(false);
let uploadPrecent = ref(0);
const open = ref(false);
const row = ref();
let uploadHelper = ref('');

const em = defineEmits(['close', 'call-back']);
const props = defineProps({
    uploadFunc: Function,
});
const handleClose = () => {
    open.value = false;
    uploadRef.value!.clearFiles();
    uploaderFiles.value = [];
    uploadPrecent.value = 0;
    uploadHelper.value = '';
    row.value = 0;
    em('close', false);
};

const uploaderFiles = ref<UploadFiles>([]);

const fileOnChange = (_uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    uploaderFiles.value = uploadFiles;
};

const handleExceed: UploadProps['onExceed'] = (files) => {
    uploadRef.value!.clearFiles();
    for (let i = 0; i < files.length; i++) {
        const file = files[i] as UploadRawFile;
        uploadRef.value!.handleStart(file);
    }
};

const hadleSuccess: UploadProps['onSuccess'] = (res, file) => {
    file.status = 'success';
};

const submit = async () => {
    loading.value = true;
    const files = uploaderFiles.value.slice();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // const CHUNK_SIZE = 1024 * 1024; // 1MB
        // const fileSize = file.size;

        uploadHelper.value = i18n.global.t('file.fileUploadStart', [file.name]);

        formData.append('images', file.raw);
    }

    props.uploadFunc(formData, {}).then((res) => {
        loading.value = false;
        uploadHelper.value = '';
        uploadRef.value!.clearFiles();
        uploaderFiles.value = [];
        MsgSuccess(i18n.global.t('file.uploadSuccess'));
        if (res.code == 200) {
            if (res.data.detail) {
                em('call-back', { ...row.value, headshot: res.data.detail.image });
            } else {
                em('call-back');
            }

            handleClose();
        }
    });
};

const acceptParams = () => {
    open.value = true;
    uploadPrecent.value = 0;
    uploadHelper.value = '';
};

defineExpose({ acceptParams });
</script>
