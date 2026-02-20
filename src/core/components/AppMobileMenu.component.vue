<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { AppRoute } from '@/router';
import { useNavigation } from '@/core/composables/navigation.composable';
import { useSidebarStore } from '@/core/stores/useSidebarStore.store';

const { goTo } = useNavigation();
const route = useRoute();
const sidebar = useSidebarStore();

interface MenuItem {
    id: string;
    icon: string;
    label: string;
    route: typeof AppRoute[keyof typeof AppRoute];
}

const menuItems: MenuItem[] = [
    { id: 'home', icon: 'mdi-home-outline', label: 'Home', route: AppRoute.HOME },
    { id: 'jobs', icon: 'mdi-briefcase-outline', label: 'Jobs', route: AppRoute.JOBS },
    { id: 'trigger', icon: 'mdi-flash-outline', label: 'Trigger', route: AppRoute.TRIGGER },
    { id: 'companies', icon: 'mdi-domain', label: 'Companies', route: AppRoute.COMPANIES },
];

const activeRoute = computed(() => route.name);

const navigate = (routeName: MenuItem['route']) => {
    goTo(routeName);
    sidebar.close();
};
</script>

<template>
    <div class="fixed inset-0 z-50">
        <div
            class="absolute inset-0 bg-black/40"
            @click="sidebar.close()"
        />
        <div class="relative bg-slate-900 text-white shadow-xl">
            <div class="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <h2 class="text-lg font-semibold tracking-wide">
                    Navigation
                </h2>

                <button
                    class="p-2 rounded-lg hover:bg-white/10 transition"
                    @click="sidebar.close()"
                >
                    <i class="mdi mdi-close text-2xl"></i>
                </button>
            </div>
            <nav class="flex flex-col px-6 py-6 gap-2">
                <button
                    v-for="item in menuItems"
                    :key="item.id"
                    :class="activeRoute === item.route
            ? 'bg-white/10 text-white'
            : 'text-gray-300 hover:bg-white/5 hover:text-white'"
                    class="flex items-center gap-4 px-4 py-4 rounded-xl transition"
                    @click="navigate(item.route)"
                >
                    <i :class="item.icon" class="mdi text-xl"></i>
                    <span class="font-medium text-base">
            {{ item.label }}
          </span>
                </button>
            </nav>
        </div>
    </div>
</template>
