<template>
    <LayoutContent v-loading="loading" :title="$t('celebrities.entertainment')">
        <template #main>
            <ComplexTable :pagination-config="paginationConfig" :data="data" @search="search" @sort-change="search">
                <el-table-column :label="$t('celebrities.headshot')" prop="headshot" fix>
                    <template #default="{ row }">
                        <span v-if="row.headshot">
                            <el-avatar shape="circle" :size="50" :src="row.headshot" />
                        </span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('celebrities.name')" prop="name" sortable>
                    <template #default="{ row }">
                        <span v-if="row.name">
                            {{ row.name }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('celebrities.address')" prop="address" sortable>
                    <template #default="{ row }">
                        <span v-if="row.address">
                            {{ row.address }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('celebrities.sex')" prop="sex" sortable>
                    <template #default="{ row }">
                        <span v-if="row.sex">
                            {{ row.sex === 1 ? $t('celebrities.sex_man') : $t('celebrities.sex_woman') }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('celebrities.ballot')" prop="ballot" sortable>
                    <template #default="{ row }">
                        <span v-if="row.ballot">
                            {{ row.ballot }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('celebrities.remark')"
                    prop="remark"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column ellipsis="4" :label="$t('commons.table.operate')" width="230">
                    <template #default="{ row }">
                        <el-button
                            v-for="item in buttons"
                            :key="item.key"
                            :type="item.type(row)"
                            link
                            @click="item.click(row)"
                        >
                            {{ typeof item.label === 'function' ? item.label(row) : item.label }}
                        </el-button>
                    </template>
                </el-table-column>
            </ComplexTable>
        </template>
    </LayoutContent>
    <CelebritiesDetail ref="dialogBackupRef" @search="search" :is-edit="false"></CelebritiesDetail>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { getCelebrityPage, setCelebrityLike } from '@/api/modules/celebrity';
import CelebritiesDetail from '@/components/celebrities-detail/index.vue';
import i18n from '@/lang';
import { MsgSuccess } from '@/utils/message';

const paginationConfig = reactive({
    currentPage: 1,
    pageSize: 50,
    total: 0,
});

const data = ref();

const loading = ref(false);

const searchName = ref();

const dialogBackupRef = ref();

const onOpenBackupDialog = async (row) => {
    dialogBackupRef.value!.acceptParams(row);
};

const buttons = [
    {
        label: (row) => (row.is_liked ? i18n.global.t('celebrities.is_liked') : i18n.global.t('celebrities.is_like')),
        click: (row) => {
            setCelebrityLike({ id: row.id, is_liked: !row.is_liked }).then(() => {
                MsgSuccess(i18n.global.t('celebrities.set_follow'));
                search();
            });
        },
        type: (row) => (row.is_liked ? 'danger' : 'primary'),
        key: 2,
    },

    {
        label: i18n.global.t('celebrities.detail'),
        click: (row) => {
            onOpenBackupDialog(row);
        },
        type: () => 'primary',
        key: 4,
    },
];

const search = async (column?: any) => {
    let params = {
        character: '4',
        page: paginationConfig.currentPage,
        size: paginationConfig.pageSize,
        orderBy: column?.order ? column.prop : 'created_at',
        order: column?.order ? column.order : 'null',
        searchName: searchName.value,
    };
    loading.value = true;
    await getCelebrityPage(params)
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
        background: #6f75d7;
        height: 108px;
        padding: 10px 20px 10px 20px;
        border-radius: var(--el-card-border-radius); //6px;
        color: #fff;
        .app-title {
            font-weight: 500;
            font-size: 16px;
            // color: var(--el-text-color-regular);
        }
    }

    .top-content {
        padding: var(--el-card-padding);
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
