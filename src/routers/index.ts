import router from '@/routers/router';
import NProgress from '@/config/nprogress';
import { AxiosCanceler } from '@/api/helper/axios-cancel';

const axiosCanceler = new AxiosCanceler();

/**
 * @description 路由拦截 beforeEach（路由配置无数种方法，个人觉得最简便）
 * */
router.beforeEach((to, from, next) => {
    NProgress.start();
    axiosCanceler.removeAllPending();

    if (!to.matched.some((record) => record.meta.requiresAuth)) return next();
    return next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
