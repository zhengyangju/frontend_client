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
                        <el-col :xs="24" :sm="12" :md="9" :lg="9" :xl="9">
                            <el-form-item :label="$t('celebrities.character')" prop="character">
                                <fu-select-rw-switch
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.character"
                                >
                                    <template #read>
                                        <el-tag disable-transitions>
                                            {{ calcCharacter(form) }}
                                        </el-tag>
                                    </template>
                                    <el-option
                                        v-for="item in characters.list"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
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

                            <el-form-item :label="$t('celebrities.remark')" prop="remark">
                                <fu-input-rw-switch
                                    clearable
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.remark"
                                ></fu-input-rw-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="9" :lg="9" :xl="9">
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
                            <el-form-item :label="$t('rank.contact_information')" prop="contact_information">
                                <fu-input-rw-switch
                                    clearable
                                    :disabled="!is_edit"
                                    style="width: 100%"
                                    v-model.trim="form.contact_information"
                                ></fu-input-rw-switch>
                            </el-form-item>
                            <el-form-item v-if="is_edit" :label="$t('commons.table.operate')">
                                <el-button type="primary" @click="onSubmit(formRef)">
                                    {{ $t('commons.button.save') }}
                                </el-button>
                                <el-button type="primary" @click="onChangeState">编辑链接</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- start -->
                    <el-row type="flex" justify="start" :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item :label="$t('rank.bilibili_link')" prop="bilibili_link">
                                <el-input v-if="doEdit()" clearable v-model.trim="form.bilibili_link" />
                                <el-link v-else :href="form.bilibili_link" target="_blank">
                                    {{ form.bilibili_link }}
                                </el-link>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="start" :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item :label="$t('rank.weibolntl_link')" prop="weibolntl_link">
                                <el-input v-if="doEdit()" clearable v-model.trim="form.weibolntl_link" />
                                <el-link v-else :href="form.weibolntl_link" target="_blank">
                                    {{ form.weibolntl_link }}
                                </el-link>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="start" :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item :label="$t('rank.tik_tok_link')" prop="tik_tok_link">
                                <el-input v-if="doEdit()" clearable v-model.trim="form.tik_tok_link" />
                                <el-link v-else :href="form.tik_tok_link" target="_blank">
                                    {{ form.tik_tok_link }}
                                </el-link>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="start" :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item :label="$t('rank.little_red_book_link')" prop="little_red_book_link">
                                <el-input v-if="doEdit()" clearable v-model.trim="form.little_red_book_link" />
                                <el-link v-else :href="form.little_red_book_link" target="_blank">
                                    {{ form.little_red_book_link }}
                                </el-link>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-row type="flex" justify="start" :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item :label="$t('celebrities.description_article')" prop="description">
                                <el-input
                                    :rows="8"
                                    type="textarea"
                                    :disabled="!doEdit()"
                                    clearable
                                    v-model.trim="form.little_red_book_link"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row> -->
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

const backupVisiable = ref(false);
const uploadRef = ref();
const formRef = ref();
const is_edit = ref(true);
const canEdit = ref(false);

const characters = reactive({
    list: [],
});
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
    name: [Rules.requiredInput],
    ballot: [Rules.integerNumberWith0],
});

const props = defineProps({
    isEdit: Boolean,
    list: Array,
});

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
    characters.list = props.list;
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

const calcCharacter = (form) => {
    let item = characters.list.find((item) => item.id === form.character);
    if (item) {
        return item.name;
    } else {
        return '';
    }
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
        // data.value = [res.data];
        for (const key in res.data) {
            const element = res.data[key];
            form[key] = element;
        }
    });
};

const openUploads = (row) => {
    if (doEdit()) {
        uploadRef.value.acceptParams(row);
    }
};

const onChangeState = () => {
    canEdit.value = !canEdit.value;
};

const doEdit = () => {
    return is_edit.value === true && canEdit.value === true;
};

const setUrl = (row) => {
    // console.log(row);
    // let d = data.value.find((item) => item.id === row.id);
    // d['headshot'] = row.headshot;
    form['headshot'] = row.headshot;
};

defineExpose({
    acceptParams,
});
</script>
