<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AppRoute } from '@/router';
import { useAuth } from '@/core/composables/useAuth.composable.ts';
import FsHeader from '@/core/design-system/fsHeader.component.vue';

const router = useRouter();
const { token, logout, user } = useAuth();

const isAuthenticated = computed(() => !!token.value);
const menuOpen = ref(false);

const userName = computed(() => user.value?.name || 'User');
const userEmail = computed(() => user.value?.email || '');

const userInitials = computed(() =>
    userName.value
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase(),
);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

const handleLogout = () => {
    menuOpen.value = false;
    logout();
    router.push('/');
};
</script>

<template>
    <FsHeader>
        <template #left>
            <h2
                v-if="isAuthenticated"
                class="text-2xl font-semibold text-gray-800"
            >
                Hi, {{ userName }}
            </h2>
        </template>

        <template #right>
            <template v-if="isAuthenticated">

                <div class="relative">
                    <input
                        class="w-64 rounded-lg border border-gray-200 bg-white px-4 py-2 pr-10 text-sm outline-none transition focus:border-indigo-500"
                        placeholder="Search..."
                        type="text"
                    />
                    <i class="mdi mdi-magnify absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                </div>

                <button class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition relative">
                    <i class="mdi mdi-bell-outline text-xl"></i>
                </button>

                <button class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition">
                    <i class="mdi mdi-cog-outline text-xl"></i>
                </button>

                <div
                    class="relative cursor-pointer"
                    @click="toggleMenu"
                >
                    <div
                        class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm transition hover:scale-105"
                    >
                        {{ userInitials }}
                    </div>

                    <div
                        v-if="menuOpen"
                        class="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50"
                    >

                        <div class="p-5 flex gap-4 items-center bg-gray-50">
                            <div
                                class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold"
                            >
                                {{ userInitials }}
                            </div>

                            <div class="min-w-0">
                                <p class="font-semibold text-gray-800">
                                    {{ userName }}
                                </p>
                                <p class="text-sm text-gray-500 truncate">
                                    {{ userEmail }}
                                </p>
                            </div>
                        </div>

                        <div class="h-px bg-gray-200"></div>

                        <button
                            class="w-full px-5 py-3 text-left flex items-center gap-3 text-red-600 hover:bg-red-50 transition"
                            @click="handleLogout"
                        >
                            <i class="mdi mdi-logout text-lg"></i>
                            Logout
                        </button>

                    </div>
                </div>

            </template>

            <template v-else>

                <button
                    class="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium
                           text-gray-700 hover:bg-gray-100 transition"
                    @click="router.push({ name: AppRoute.LOGIN })"
                >
                    Login
                </button>

                <button
                    class="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium
                           hover:bg-indigo-700 transition"
                    @click="router.push({ name: AppRoute.REGISTER })"
                >
                    Register
                </button>

            </template>
        </template>
    </FsHeader>
</template>
