<template>
    <el-drawer v-model="createVisiable" :destroy-on-close="true" :close-on-click-modal="false" size="30%">
        <template #header>
            <DrawerHeader v-if="form.id !== ''" :header="$t('celebrityCharacter.edit')" :back="handleClose" />
            <DrawerHeader v-else :header="$t('celebrityCharacter.create')" :back="handleClose" />
        </template>
        <div v-loading="loading">
            <el-form ref="formRef" label-position="top" :model="form" :rules="rules">
                <el-row type="flex" justify="center">
                    <el-col :span="22">
                        <el-form-item :label="$t('commons.login.username')" prop="name">
                            <el-input clearable v-model.trim="form.name" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button :disabled="loading" @click="createVisiable = false">
                    {{ $t('commons.button.cancel') }}
                </el-button>
                <el-button :disabled="loading" type="primary" @click="onSubmit(formRef)">
                    {{ $t('commons.button.confirm') }}
                </el-button>
            </span>
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Rules } from '@/global/form-rules';
import i18n from '@/lang';
import { ElForm } from 'element-plus';
import { addCelebrityCharacter, editCelebrityCharacter } from '@/api/modules/celebrity';
import DrawerHeader from '@/components/drawer-header/index.vue';
import { MsgSuccess } from '@/utils/message';
import { getRandomStr } from '@/utils/util';

const loading = ref();
const createVisiable = ref(false);

const initForm = () => ({
    name: '',
    id: '',
});
const form = reactive(initForm());
const rules = reactive({
    name: [Rules.requiredInput],
});
type FormInstance = InstanceType<typeof ElForm>;
const formRef = ref<FormInstance>();

const acceptParams = (params): void => {
    if (params) {
        random();
        const { name, id } = params;
        form.name = name || '';
        form.id = id || '';
    } else {
        form.id = '';
        random();
    }
    createVisiable.value = true;
};
const handleClose = () => {
    Object.assign(form, initForm());
    createVisiable.value = false;
};
const random = async () => {
    form.password = getRandomStr(16);
};
const emit = defineEmits<{ (e: 'search'): void }>();

const onSubmit = async (formEl: FormInstance | undefined) => {
    let func = form.id !== '' ? editCelebrityCharacter : addCelebrityCharacter;
    const { name, id } = form;
    let params = {
        name,
    };
    if (id !== '') {
        params['id'] = id;
    }
    console.log(params);
    console.log(func);

    if (!formEl) return;
    formEl.validate(async (valid) => {
        if (!valid) return;
        loading.value = true;
        await func(params)
            .then(() => {
                loading.value = false;
                MsgSuccess(i18n.global.t('commons.msg.operationSuccess'));
                emit('search');
                createVisiable.value = false;
            })
            .catch(() => {
                loading.value = false;
            });
    });
};

defineExpose({
    acceptParams,
});
</script>
