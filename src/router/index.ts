import { createRouter, createWebHistory } from 'vue-router';

export const AppRoute = {
    HOME: 'home',
    TRIGGER: 'trigger',
    JOBS: 'jobs',
    JOB_DETAIL: 'job-detail',
    LOGIN: 'login',
    REGISTER: 'register',
} as const;

export type AppRouteName = typeof AppRoute[keyof typeof AppRoute];

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: AppRoute.HOME,
            path: '/',
            component: () => import('@/modules/home/Home.component.vue'),
        },
        {
            name: AppRoute.JOB_DETAIL,
            path: '/jobs/:id',
            component: () => import('@/modules/job/JobDetail.component.vue'),
            props: true,
        },
        {
            name: AppRoute.JOBS,
            path: '/jobs',
            component: () => import('@/modules/jobs/JobList.component.vue'),
        },
        {
            name: AppRoute.TRIGGER,
            path: '/trigger',
            component: () => import('@/modules/trigger/Trigger.component.vue'),
        },
        {
            path: '/login',
            name: AppRoute.LOGIN,
            component: () => import('@/modules/auth/features/Login.component.vue'),
        },
        {
            path: '/register',
            name: AppRoute.REGISTER,
            component: () => import('@/modules/auth/features/Register.component.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
});

export default router;
