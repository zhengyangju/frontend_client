import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Layout } from '@/routers/constant';

const modules = import.meta.globEager('./mymodules/ranks.ts');

const homeRouter: RouteRecordRaw = {
    path: '/',
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
                    // hidden: true,
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
                    // hidden: true,
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
                    // hidden: true,
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
                    // hidden: true,
                    meta: {
                        activeMenu: '/celebrities',
                        requiresAuth: false,
                    },
                },
            ],
        },
    ],
};
export const routerArray: RouteRecordRaw[] = [];

export const rolesRoutes = [
    ...Object.keys(modules)
        .map((key) => modules[key].default)
        .sort((r1, r2) => {
            r1.sort ??= Number.MAX_VALUE;
            r2.sort ??= Number.MAX_VALUE;
            return r1.sort - r2.sort;
        }),
];

rolesRoutes.forEach((item) => {
    const menu = item as RouteRecordRaw;
    routerArray.push(menu);
});

export const menuList: RouteRecordRaw[] = [];
rolesRoutes.forEach((item) => {
    let menuItem = JSON.parse(JSON.stringify(item));
    let menuChildren: RouteRecordRaw[] = [];
    menuItem.children.forEach((child: any) => {
        if (child.hidden == null || child.hidden == false) {
            menuChildren.push(child);
        }
    });
    menuItem.children = menuChildren as RouteRecordRaw[];
    menuList.push(menuItem);
});
menuList.unshift(homeRouter);

export const routes: RouteRecordRaw[] = [
    homeRouter,
    // {
    //     path: '/login',
    //     name: 'login',
    //     props: true,
    //     component: () => import('@/views/login/index.vue'),
    //     meta: {
    //         requiresAuth: false,
    //         key: 'login',
    //     },
    // },
    // {
    //     path: '/:code?',
    //     name: 'entrance',
    //     component: () => import('@/views/login/entrance/index.vue'),
    //     props: true,
    // },
    ...routerArray,
    {
        path: '/:pathMatch(.*)*', ///:pathMatch(.*)*
        // redirect: { name: '404' },
        name: '404',
        component: () => import('@/components/error-message/404.vue'),
    },
];
const router = createRouter({
    history: createWebHistory('/'),
    routes: routes as RouteRecordRaw[],
    strict: false,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
