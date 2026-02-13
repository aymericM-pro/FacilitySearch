import { createRouter, createWebHistory } from 'vue-router';

export const AppRoute = {
    HOME: 'home',
} as const

export type AppRouteName = typeof AppRoute[keyof typeof AppRoute]


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: AppRoute.HOME,
            component: () => import('@/App.component.vue'),
            meta: { auth: false },
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/login',
        },
    ],
});

export default router;
