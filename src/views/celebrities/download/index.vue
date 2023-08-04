<template>
    <el-button plain :disabled="false" type="primary" @click="downloadCelebrities()">
        {{ $t('celebrities.download') }}
    </el-button>
</template>
<script lang="ts" setup>
import { downloadCelebrityFiles } from '@/api/modules/celebrity';

const downloadCelebrities = () => {
    downloadCelebrityFiles()
        .then(({ response, headers }) => {
            let filename = null;
            if (headers['content-disposition'].indexOf('filename*=') > 0) {
                filename = decodeURIComponent(headers['content-disposition'].split('filename*=')[1].split("''")[1]);
            } else {
                filename = headers['content-disposition'].split(';')[1].split('=')[1];
            }
            const downloadUrl = window.URL.createObjectURL(
                new Blob([response.data], { type: 'application/vnd.ms-excel;charset=utf-8' }),
                // new Blob([data], {
                //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
                // }),
            );
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = downloadUrl;
            a.download = filename;
            const event = new MouseEvent('click');
            a.dispatchEvent(event);
        })
        .finally(() => {});

    // 导出结果
    // const exportRes = () => {
    //     const params = getParamsHandler();
    //     const api =
    //         pageState.activeTabs == 0
    //             ? recipesAPI.queryCompareDownload
    //             : pageState.activeTabs == 1
    //             ? recipesAPI.queryCompareEqpDownload
    //             : recipesAPI.queryCompareEqpParamsDownload;
    //     api(params).then(({ data, headers }) => {
    //         const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' });
    //         // const filename = `${new Date().getTime()}.xls`
    //         let filename = null;
    //         if (headers['content-disposition'].indexOf('filename*=') > 0) {
    //             filename = decodeURIComponent(headers['content-disposition'].split('filename*=')[1].split("''")[1]);
    //         } else {
    //             filename = headers['content-disposition'].split(';')[1].split('=')[1];
    //         }
    //         const a = document.createElement('a');
    //         const url = window.URL.createObjectURL(blob);
    //         a.href = url;
    //         a.download = `${filename.split('.')[0]}.xls`;
    //         const body = document.getElementsByTagName('body')[0];
    //         body.appendChild(a);
    //         a.click();
    //         body.removeChild(a);
    //         window.URL.revokeObjectURL(url);
    //     });
    // };
};
</script>
