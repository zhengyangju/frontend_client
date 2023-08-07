import { Layout } from '@/routers/constant';

const userListStoreRouter = {
    sort: 2,
    path: '/celebrity-character',
    component: Layout,
    redirect: '/celebrity-character/list',
    meta: {
        icon: 'p-caidan',
        title: 'menu.celebrityCharacter',
    },
    children: [
        {
            path: '/celebrity-character',
            name: 'characterList',
            redirect: '/celebrity-character/list',
            component: () => import('@/views/celebrity-character/index.vue'),
            meta: {},
            children: [
                {
                    path: 'list',
                    name: 'characterListPage',
                    component: () => import('@/views/celebrity-character/list/index.vue'),
                    props: true,
                    hidden: true,
                    meta: {
                        activeMenu: '/celebrity-character',
                        requiresAuth: false,
                    },
                },
            ],
        },
    ],
};

export default userListStoreRouter;
