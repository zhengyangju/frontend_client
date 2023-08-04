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
            :limit="1"
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

interface UploadFileProps {
    path: string;
}

const uploadRef = ref<UploadInstance>();
const loading = ref(false);
let uploadPrecent = ref(0);
const open = ref(false);
const path = ref();
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
    let success = 0;
    const files = uploaderFiles.value.slice();
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // const CHUNK_SIZE = 1024 * 1024; // 1MB
        // const fileSize = file.size;

        uploadHelper.value = i18n.global.t('file.fileUploadStart', [file.name]);
        const formData = new FormData();
        formData.append('file', file.raw);
        formData.append('image', file.raw);
        formData.append('path', '/');
        let res = await props.uploadFunc(formData, {});
        if (i == files.length - 1) {
            loading.value = false;
            uploadHelper.value = '';
            success = files.length;
            if (success == files.length) {
                uploadRef.value!.clearFiles();
                uploaderFiles.value = [];
                MsgSuccess(i18n.global.t('file.uploadSuccess'));
            }
        }
        if (res.code == 200) {
            if (res.data.detail) {
                em('call-back', { ...row.value, headshot: res.data.detail.image });
            } else {
                em('call-back');
            }

            handleClose();
        }

        // const chunkCount = Math.ceil(fileSize / CHUNK_SIZE);
        // let uploadedChunkCount = 0;
        // for (let c = 0; c < chunkCount; c++) {
        //     const start = c * CHUNK_SIZE;
        //     const end = Math.min(start + CHUNK_SIZE, fileSize);
        //     const chunk = file.raw.slice(start, end);
        //     const formData = new FormData();

        //     formData.append('filename', file.name);
        //     formData.append('path', path.value);
        //     formData.append('chunk', chunk);
        //     formData.append('chunkIndex', c.toString());
        //     formData.append('chunkCount', chunkCount.toString());

        //     try {
        //         await uploadCelebrityFiles(formData, {
        //             onUploadProgress: (progressEvent) => {
        //                 const progress = Math.round(
        //                     ((uploadedChunkCount + progressEvent.loaded / progressEvent.total) * 100) / chunkCount,
        //                 );
        //                 uploadPrecent.value = progress;
        //             },
        //             timeout: 40000,
        //         });
        //         uploadedChunkCount++;
        //     } catch (error) {
        //         uploaderFiles.value[i].status = 'fail';
        //         break;
        //     }
        //     if (uploadedChunkCount == chunkCount) {
        //         success++;
        //         uploaderFiles.value[i].status = 'success';
        //         break;
        //     }
        // }
        // if (i == files.length - 1) {
        //     loading.value = false;
        //     uploadHelper.value = '';
        //     if (success == files.length) {
        //         uploadRef.value!.clearFiles();
        //         uploaderFiles.value = [];
        //         MsgSuccess(i18n.global.t('file.uploadSuccess'));
        //     }
        // }
    }
};

const acceptParams = (props: UploadFileProps) => {
    row.value = props;
    path.value = props.path;
    open.value = true;
    uploadPrecent.value = 0;
    uploadHelper.value = '';
};

defineExpose({ acceptParams });
</script>
