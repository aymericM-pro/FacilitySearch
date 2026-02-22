import { createRouter, createWebHistory } from 'vue-router';
import { useLocalStorage } from '@/core/composables/localStorage.composable.ts';

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

export type AppRouteName = keyof typeof AppRoute;

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: AppRoute.HOME,
            path: '/',
            component: () => import('@/modules/home/Home.component.vue'),
            meta: { requiresAuth: true },
        },
        {
            name: AppRoute.JOB_DETAIL,
            path: '/jobs/:id',
            component: () => import('@/modules/job/JobDetail.component.vue'),
            props: true,
            meta: { requiresAuth: true },
        },
        {
            name: AppRoute.JOBS,
            path: '/jobs',
            component: () => import('@/modules/jobs/JobList.component.vue'),
            meta: { requiresAuth: true },
        },
        {
            name: AppRoute.TRIGGER,
            path: '/trigger',
            component: () => import('@/modules/trigger/Trigger.component.vue'),
            meta: { requiresAuth: true },
        },
        {
            name: AppRoute.COMPANIES,
            path: '/companies',
            component: () => import('@/modules/companies/CompaniesList.component.vue'),
            meta: { requiresAuth: true },
        },
        {
            name: AppRoute.COMPANY_DETAIL,
            path: '/companies/:id',
            component: () => import('@/modules/company/CompanyDetail.component.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: AppRoute.LOGIN,
            component: () => import('@/modules/auth/features/Login.component.vue'),
            meta: { requiresAuth: false },
        },
        {
            path: '/register',
            name: AppRoute.REGISTER,
            component: () => import('@/modules/auth/features/Register.component.vue'),
            meta: { requiresAuth: false },
        },
        {
            path: '/profile',
            name: AppRoute.PROFILE,
            component: () => import('@/modules/profile/Profile.component.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
});

function isAuthenticated(): boolean {
    const { getItem } = useLocalStorage();
    return !!getItem('token');
}

router.beforeEach((to) => {
    const loggedIn = isAuthenticated();

    if (to.meta.requiresAuth && !loggedIn) {
        return {
            name: AppRoute.LOGIN,
            query: { redirect: to.fullPath },
        };
    }

    if ((to.name === AppRoute.LOGIN || to.name === AppRoute.REGISTER) && loggedIn) {
        return { name: AppRoute.HOME };
    }

    return true;
});

export default router;
