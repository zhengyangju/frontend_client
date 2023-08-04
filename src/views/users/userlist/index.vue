<template>
    <LayoutContent v-loading="loading" :title="$t('users.userlist')">
        <template #toolbar>
            <el-row>
                <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                    <el-button plain :disabled="false" type="primary" @click="onOpenBackupDialog">
                        {{ $t('users.create') }}
                    </el-button>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                    <div class="search-button">
                        <el-input
                            v-model="searchName"
                            clearable
                            @clear="search()"
                            suffix-icon="Search"
                            @keyup.enter="search()"
                            @change="search()"
                            :placeholder="$t('commons.button.search')"
                        ></el-input>
                    </div>
                </el-col>
            </el-row>
        </template>
        <template #main>
            <ComplexTable :pagination-config="paginationConfig" :data="data" @search="search" @sort-change="search">
                <el-table-column :label="$t('users.username')" prop="username">
                    <template #default="{ row }">
                        <span v-if="row.username">
                            {{ $t(row.username) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('users.sex')" prop="sex">
                    <template #default="{ row }">
                        <span v-if="row.sex">
                            {{ row.sex === 1 ? $t('celebrities.sex_man') : $t('celebrities.sex_woman') }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('users.phone')" prop="phone">
                    <template #default="{ row }">
                        <span v-if="row.phone">
                            {{ $t(row.phone) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('users.email')" prop="email">
                    <template #default="{ row }">
                        <span v-if="row.email">
                            {{ $t(row.email) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('users.creator')" prop="creator" sortable>
                    <template #default="{ row }">
                        <span v-if="row.creator">
                            {{ $t(row.creator) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('users.create_time')" prop="create_time">
                    <template #default="{ row }">
                        <span v-if="row.create_time">
                            {{ $t(row.create_time) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('users.last_login_time')" prop="last_login_time">
                    <template #default="{ row }">
                        <span v-if="row.last_login_time">
                            {{ $t(row.last_login_time) }}
                        </span>
                    </template>
                </el-table-column>
                <fu-table-operations
                    width="200"
                    :ellipsis="4"
                    :buttons="buttons"
                    :label="$t('commons.table.operate')"
                    fix
                />
            </ComplexTable>
        </template>
    </LayoutContent>
    <UsersEdit ref="dialogBackupRef" @search="search"></UsersEdit>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { getUserPage } from '@/api/modules/user';
import UsersEdit from '../edit/index.vue';
import i18n from '@/lang';
// import { GlobalStore } from '@/store';

// const globalStore = GlobalStore();

const paginationConfig = reactive({
    currentPage: 1,
    pageSize: 50,
    total: 0,
});

const data = ref();

const loading = ref(false);

const searchName = ref();

const dialogBackupRef = ref();

const onOpenBackupDialog = async (row?: any) => {
    dialogBackupRef.value!.acceptParams(row);
};

const buttons = [
    {
        label: i18n.global.t('commons.button.edit'),
        click: (row) => {
            // getDetail(row);
            onOpenBackupDialog(row);
        },
        // disabled: (row: Container.ContainerInfo) => {
        //     return row.state !== 'running';
        // },
    },
];

const search = async (column?: any) => {
    let params = {
        page: paginationConfig.currentPage,
        size: paginationConfig.pageSize,
        orderBy: column?.order ? column.prop : 'created_at',
        order: column?.order ? column.order : 'null',
        searchName: searchName.value,
    };
    loading.value = true;
    await getUserPage(params)
        .then((res) => {
            loading.value = false;
            data.value = res.data.data || [];
            paginationConfig.total = res.data.total;
        })
        .catch(() => {
            loading.value = false;
        });
};

onMounted(() => {
    search();
});
</script>

<style lang="scss">
.header {
    padding-bottom: 10px;
}

.app-card {
    margin-top: 10px;
    cursor: pointer;
    padding: 5px;

    .top-header {
        padding: 10px 20px 10px 20px;
        border-radius: var(--el-card-border-radius); //6px;
        color: #fff;
        .app-title {
            font-weight: 500;
            font-size: 16px;
            // color: var(--el-text-color-regular);
        }
    }

    .app-content {
        margin-top: 10px;
        height: 100%;
        width: 100%;

        .app-header {
            height: 20%;

            .app-title {
                font-weight: 500;
                font-size: 16px;
                color: var(--el-text-color-regular);
            }

            .app-button {
                float: right;
                margin-right: 20px;
            }
        }

        .app-desc {
            margin-top: 5px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;

            text-overflow: ellipsis;
            height: 45px;

            .desc {
                font-size: 14px;
                color: var(--el-text-color-regular);
            }
        }

        .app-tag {
            margin-top: 5px;
        }
    }

    .e-card {
        border: var(--panel-border) !important;

        &:hover {
            cursor: pointer;
            border: 1px solid var(--el-color-primary) !important;
        }
    }
}

.tag-button {
    margin-right: 10px;

    &.no-active {
        background: none;
        border: none;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1200px) {
    .app-col-12 {
        max-width: 50%;
        flex: 0 0 50%;
    }
}

.page-button {
    float: right;
    margin-bottom: 10px;
    margin-top: 10px;
}
</style>
