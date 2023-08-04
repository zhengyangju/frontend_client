import { Layout } from '@/routers/constant';

const rankStoreRouter = {
    sort: 1,
    path: '/ranks',
    component: Layout,
    redirect: '/ranks/index',
    meta: {
        icon: 'p-rejected-order',
        title: 'menu.rank',
        activeMenu: '/ranks',
    },
    children: [
        {
            path: '/ranks',
            redirect: '/ranks/index',
            name: 'ranks',
            meta: {
                activeMenu: '/ranks',
                hidden: true,
                requiresAuth: false,
            },
            children: [
                {
                    path: 'index',
                    name: 'ranksPage',
                    component: () => import('@/views/ranks/index.vue'),
                    props: true,
                    hidden: true,
                    meta: {
                        activeMenu: '/ranks',
                        requiresAuth: false,
                    },
                },
            ],
        },
    ],
};

export default rankStoreRouter;
