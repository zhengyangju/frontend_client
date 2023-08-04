import { Layout } from '@/routers/constant';

const celebrityStoreRouter = {
    sort: 1,
    path: '/celebrities',
    component: Layout,
    redirect: '/celebrities/entertainment',
    meta: {
        icon: 'p-star',
        title: 'menu.celebrity',
    },
    children: [
        {
            path: '/celebrities',
            name: 'celebrities',
            redirect: '/celebrities/entertainment',
            component: () => import('@/views/celebrities/index.vue'),
            meta: {},
            children: [
                {
                    path: 'entertainment',
                    name: 'RankEntertainment',
                    component: () => import('@/views/celebrities/entertainment/index.vue'),
                    props: true,
                    hidden: true,
                    meta: {
                        activeMenu: '/celebrities',
                        requiresAuth: false,
                    },
                },
                {
                    path: 'life',
                    name: 'lifeCategory',
                    component: () => import('@/views/celebrities/life/index.vue'),
                    props: true,
                    hidden: true,
                    meta: {
                        activeMenu: '/celebrities',
                        requiresAuth: false,
                    },
                },
                {
                    path: 'game',
                    name: 'gameCategory',
                    component: () => import('@/views/celebrities/game/index.vue'),
                    props: true,
                    hidden: true,
                    meta: {
                        activeMenu: '/celebrities',
                        requiresAuth: false,
                    },
                },
                {
                    path: 'knowledge',
                    name: 'RankKnowledge',
                    component: () => import('@/views/celebrities/knowledge/index.vue'),
                    props: true,
                    hidden: true,
                    meta: {
                        activeMenu: '/celebrities',
                        requiresAuth: false,
                    },
                },
            ],
        },
    ],
};

export default celebrityStoreRouter;
