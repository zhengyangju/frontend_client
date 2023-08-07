import { Layout } from '@/routers/constant';

const userListStoreRouter = {
    sort: 2,
    path: '/users',
    component: Layout,
    redirect: '/users/userlist',
    meta: {
        icon: 'p-host',
        title: 'menu.userlist',
    },
    children: [
        {
            path: '/users',
            name: 'userlist',
            redirect: '/users/userlist',
            component: () => import('@/views/users/index.vue'),
            meta: {},
            children: [
                {
                    path: 'userlist',
                    name: 'userlistPage',
                    component: () => import('@/views/users/userlist/index.vue'),
                    props: true,
                    hidden: true,
                    meta: {
                        activeMenu: '/users',
                        requiresAuth: false,
                    },
                },
            ],
        },
    ],
};

export default userListStoreRouter;
