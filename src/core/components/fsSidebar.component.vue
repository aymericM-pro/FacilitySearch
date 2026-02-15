<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { AppRoute } from '@/router';
import { useNavigation } from '@/core/composables/navigation.composable';

const { goTo } = useNavigation();
const route = useRoute();

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
];

const activeRoute = computed(() => route.name);

const navigate = (routeName: MenuItem['route']) => {
    goTo(routeName);
};
</script>

<template>
    <aside class="w-60 bg-slate-900 text-gray-400 flex flex-col py-8 px-4 min-h-screen">

        <!-- Logo -->
        <div class="flex justify-center mb-10">
            <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl">
                <i class="mdi mdi-briefcase-outline"></i>
            </div>
        </div>

        <!-- Menu -->
        <nav class="flex flex-col gap-2">
            <button
                v-for="item in menuItems"
                :key="item.id"
                :class="activeRoute === item.route
          ? 'bg-white/10 text-white'
          : 'hover:bg-white/5 hover:text-white'"
                class="flex items-center gap-4 px-4 py-3 rounded-xl transition text-sm"
                @click="navigate(item.route)"
            >
                <i :class="item.icon" class="mdi text-xl"></i>
                <span class="font-medium">{{ item.label }}</span>
            </button>
        </nav>

    </aside>
</template>
