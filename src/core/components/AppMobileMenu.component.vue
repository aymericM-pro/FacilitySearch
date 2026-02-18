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
    <div class="overflow-hidden">
        <nav class="flex items-center justify-around bg-slate-900 text-gray-400 px-4 py-3">
            <button
                v-for="item in menuItems"
                :key="item.id"
                :class="activeRoute === item.route ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'"
                class="flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition text-sm flex-1"
                @click="navigate(item.route)"
            >
                <i :class="item.icon" class="mdi text-xl"></i>
                <span class="text-xs font-medium">{{ item.label }}</span>
            </button>
        </nav>
    </div>
</template>
