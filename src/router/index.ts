import { createRouter, createWebHistory } from 'vue-router';

export const AppRoute = {
    HOME: 'home',
    TRIGGER: 'trigger',
    JOBS: 'jobs',
    JOB_DETAIL: 'job-detail',
    COMPANIES: 'companies',
    COMPANY_DETAIL: 'company-detail',
    LOGIN: 'login',
    REGISTER: 'register',
    PROFILE: 'profile',
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
            name: AppRoute.COMPANIES,
            path: '/companies',
            component: () => import('@/modules/companies/CompaniesList.component.vue'),
        },
        {
            name: AppRoute.COMPANY_DETAIL,
            path: '/companies/:id',
            component: () => import('@/modules/company/CompanyDetail.component.vue'),
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
            path: '/profile',
            name: AppRoute.PROFILE,
            component: () => import('@/modules/profile/Profile.component.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
});

export default router;
