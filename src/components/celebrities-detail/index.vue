<template>
    <div>
        <el-drawer v-model.trim="backupVisiable" :destroy-on-close="true" :close-on-click-modal="false" size="100%">
            <template #header>
                <DrawerHeader :header="$t('celebrities.detail')" :back="handleClose" />
            </template>

            <div v-loading="loading">
                <el-form ref="formRef" label-position="top" :model="form" :rules="rules">
                    <el-row type="flex" justify="center" :gutter="10">
                        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                            <el-form-item :label="$t('celebrities.headshot')" prop="headshot">
                                <el-avatar :size="275" :src="form.headshot" @click="openUploads(form)" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                            <el-form-item :label="$t('celebrities.character')" prop="character">
                                <fu-select-rw-switch
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.character"
                                >
                                    <template #read>
                                        <el-tag disable-transitions>
                                            {{ characters.find((item) => item.value === form.character).label }}
                                        </el-tag>
                                    </template>
                                    <el-option
                                        v-for="item in characters"
                                        :key="item.key"
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </fu-select-rw-switch>
                            </el-form-item>
                            <el-form-item :label="$t('commons.login.username')" prop="name">
                                <fu-input-rw-switch
                                    clearable
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.name"
                                ></fu-input-rw-switch>
                            </el-form-item>
                            <el-form-item :label="$t('users.sex')" prop="sex">
                                <fu-select-rw-switch :disabled="!is_edit" style="width: 100%" v-model.trim="form.sex">
                                    <template #read>
                                        <el-tag disable-transitions>
                                            {{ sexTypes.find((item) => item.value === form.sex).label }}
                                        </el-tag>
                                    </template>
                                    <el-option
                                        v-for="item in sexTypes"
                                        :key="item.key"
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </fu-select-rw-switch>
                            </el-form-item>

                            <el-form-item :label="$t('rank.contact_information')" prop="contact_information">
                                <fu-input-rw-switch
                                    clearable
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.contact_information"
                                ></fu-input-rw-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                            <el-form-item :label="$t('celebrities.address')" prop="address">
                                <fu-input-rw-switch
                                    clearable
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.address"
                                ></fu-input-rw-switch>
                            </el-form-item>
                            <el-form-item :label="$t('celebrities.ballot')" prop="ballot">
                                <fu-input-rw-switch
                                    clearable
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.ballot"
                                ></fu-input-rw-switch>
                            </el-form-item>

                            <el-form-item :label="$t('rank.tik_tok_link')" prop="tik_tok_link">
                                <fu-input-rw-switch
                                    clearable
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.tik_tok_link"
                                ></fu-input-rw-switch>
                            </el-form-item>
                            <el-form-item :label="$t('rank.little_red_book_link')" prop="little_red_book_link">
                                <fu-input-rw-switch
                                    clearable
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.little_red_book_link"
                                ></fu-input-rw-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
                            <el-form-item :label="$t('rank.bilibili_link')" prop="bilibili_link">
                                <fu-input-rw-switch
                                    clearable
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.bilibili_link"
                                ></fu-input-rw-switch>
                            </el-form-item>
                            <el-form-item :label="$t('rank.weibolntl_link')" prop="weibolntl_link">
                                <fu-input-rw-switch
                                    clearable
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.weibolntl_link"
                                ></fu-input-rw-switch>
                            </el-form-item>
                            <el-form-item :label="$t('celebrities.remark')" prop="remark">
                                <fu-input-rw-switch
                                    clearable
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.remark"
                                ></fu-input-rw-switch>
                            </el-form-item>
                            <el-form-item v-if="is_edit" :label="$t('commons.table.operate')" prop="weibolntl_link">
                                <el-button type="primary" @click="onSubmit(formRef)">
                                    {{ $t('commons.button.save') }}
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="start" :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item :label="$t('celebrities.description_article')" prop="description">
                                <fu-input-rw-switch
                                    :disabled="!is_edit"
                                    :rows="8"
                                    type="textarea"
                                    style="width: 100%"
                                    v-model.trim="form.description"
                                    placeholder="文章描述"
                                ></fu-input-rw-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-drawer>
    </div>
    <Uploads ref="uploadRef" :upload-func="UploadImageFileData" @call-back="setUrl" />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { getCelebrityDetail } from '@/api/modules/celebrity';
import DrawerHeader from '@/components/drawer-header/index.vue';
import i18n from '@/lang';
import { editCelebrityDetail } from '@/api/modules/celebrity';
import Uploads from '@/views/celebrities/upload/index.vue';
import { UploadImageFileData } from '@/api/modules/images';
import { MsgSuccess } from '@/utils/message';
import { Rules } from '@/global/form-rules';
import { FormInstance } from 'element-plus';

const emit = defineEmits(['search']);

const loading = ref();

const data = ref();

const backupVisiable = ref(false);
const uploadRef = ref();
const formRef = ref();
const is_edit = ref(true);

const characters = ref();
const sexTypes = ref();
const initForm = () => ({
    character: 1,
    name: '',
    headshot: '',
    sex: 1,
    address: '',
    ballot: 0,
    remark: '',
    tik_tok_link: '',
    bilibili_link: '',
    weibolntl_link: '',
    little_red_book_link: '',
    description: '',
    id: '',
    contact_information: '',
});
const form = reactive(initForm());
const rules = reactive({
    name: [Rules.requiredInput, Rules.name],
    ballot: [Rules.integerNumberWith0],
    remark: [Rules.requiredInput],
});

const props = defineProps({
    isEdit: Boolean,
});

characters.value = [
    {
        label: i18n.global.t('celebrities.entertainment'),
        value: 1,
        key: 'entertainment',
    },
    {
        label: i18n.global.t('celebrities.lifeCategory'),
        value: 2,
        key: 'lifeCategory',
    },
    {
        label: i18n.global.t('celebrities.gameCategory'),
        value: 3,
        key: 'gameCategory',
    },
    {
        label: i18n.global.t('celebrities.knowledgeCategory'),
        value: 4,
        key: 'knowledgeCategory',
    },
];

sexTypes.value = [
    {
        label: i18n.global.t('celebrities.sex_man'),
        value: 1,
        key: 'sex_man',
    },
    {
        label: i18n.global.t('celebrities.sex_woman'),
        value: 2,
        key: 'sex_woman',
    },
];

const acceptParams = (row): void => {
    backupVisiable.value = true;
    if (props.isEdit !== undefined) {
        is_edit.value = props.isEdit;
    }
    getDetail(row);
};
const handleClose = () => {
    backupVisiable.value = false;
    Object.assign(form, initForm());
};

const onSubmit = async (formEl: FormInstance | undefined) => {
    formEl.validate(async (valid) => {
        if (!valid) return;
        loading.value = true;
        form.ballot = form.ballot * 1;
        editCelebrityDetail(form)
            .then(() => {
                MsgSuccess('保存成功！');
                handleClose();
                emit('search');
            })
            .finally(() => {
                loading.value = false;
            });
    });
};

const getDetail = (row) => {
    getCelebrityDetail({ id: row.id }).then((res: any) => {
        data.value = [res.data];
        for (const key in res.data) {
            const element = res.data[key];
            form[key] = element;
        }
    });
};

const openUploads = (row) => {
    if (is_edit.value) {
        uploadRef.value.acceptParams(row);
    }
};

const setUrl = (row) => {
    // console.log(row);
    let d = data.value.find((item) => item.id === row.id);
    d['headshot'] = row.headshot;
};

defineExpose({
    acceptParams,
});
</script>
