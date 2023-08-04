<template>
    <el-drawer v-model="createVisiable" :destroy-on-close="true" :close-on-click-modal="false" size="30%">
        <template #header>
            <DrawerHeader v-if="form.id !== ''" :header="$t('users.edit')" :back="handleClose" />
            <DrawerHeader v-else :header="$t('users.create')" :back="handleClose" />
        </template>
        <div v-loading="loading">
            <el-form ref="formRef" label-position="top" :model="form" :rules="rules">
                <el-row type="flex" justify="center">
                    <el-col :span="22">
                        <el-form-item :label="$t('users.sex')" prop="sex">
                            <el-select v-model="form.sex">
                                <el-option :label="$t('celebrities.sex_man')" :value="1" />
                                <el-option :label="$t('celebrities.sex_woman')" :value="2" />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('commons.login.username')" prop="username">
                            <el-input clearable v-model.trim="form.username" />
                        </el-form-item>
                        <el-form-item v-if="form.id === ''" :label="$t('commons.login.password')" prop="password">
                            <el-input type="password" clearable show-password v-model.trim="form.password">
                                <template #append>
                                    <el-button @click="random">{{ $t('commons.button.random') }}</el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('users.phone')" prop="phone">
                            <el-input clearable v-model.trim="form.phone" />
                        </el-form-item>
                        <el-form-item :label="$t('users.email')" prop="email">
                            <el-input clearable v-model.trim="form.email" />
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
import { editUserDetail, addUserDetail } from '@/api/modules/user';
import DrawerHeader from '@/components/drawer-header/index.vue';
import { MsgSuccess } from '@/utils/message';
import { getRandomStr } from '@/utils/util';

const loading = ref();
const createVisiable = ref(false);

const initForm = () => ({
    username: '',
    sex: 1,
    phone: '',
    email: '',
    password: '',
    id: '',
});
const form = reactive(initForm());
const rules = reactive({
    username: [Rules.requiredInput, Rules.name],
    password: [Rules.requiredInput],
    email: [Rules.emailCheck],
});
type FormInstance = InstanceType<typeof ElForm>;
const formRef = ref<FormInstance>();

const acceptParams = (params): void => {
    if (params) {
        random();
        const { username, sex, phone, email, id } = params;
        form.username = username || '';
        form.sex = sex || 1;
        form.phone = phone || '';
        form.email = email || '';
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
    let func = form.id !== '' ? editUserDetail : addUserDetail;
    const { username, sex, phone, email, id, password } = form;
    let params = {
        username,
        sex,
        phone,
        email,
    };
    if (id !== '') {
        params['id'] = id;
    } else {
        params['password'] = password;
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
