<script lang="ts" setup>
import { RouterView, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import fsLink from '@/core/design-system/fsLink.component.vue';
import { useAuth } from '@/core/composables/useAuth.composable.ts';

const { t } = useI18n();
const router = useRouter();
const { token, logout } = useAuth();

const isAuthenticated = computed(() => !!token.value);

const goLogin = () => router.push('/login');
const goRegister = () => router.push('/register');
const handleLogout = () => {
    logout();
    router.push('/');
};
</script>

<template>
    <div class="min-h-screen bg-slate-50">
        <header class="bg-indigo-100 border-b border-indigo-200">
            <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                <!-- Logo -->
                <h1 class="font-semibold text-indigo-700 text-lg tracking-tight">
                    JobSearch
                </h1>

                <!-- Navigation -->
                <nav class="flex items-center gap-8 text-indigo-600">

                    <fsLink to="/">
                        {{ t('navigation.home') }}
                    </fsLink>

                    <fsLink to="/trigger">
                        {{ t('navigation.trigger') }}
                    </fsLink>

                    <fsLink to="/jobs">
                        {{ t('navigation.jobs') }}
                    </fsLink>

                    <!-- Auth -->
                    <template v-if="!isAuthenticated">
                        <button class="hover:text-indigo-800" @click="goLogin">
                            Login
                        </button>

                        <button
                            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                            @click="goRegister"
                        >
                            Register
                        </button>
                    </template>

                    <template v-else>
                        <button
                            class="text-red-600 hover:text-red-800"
                            @click="handleLogout"
                        >
                            Logout
                        </button>
                    </template>

                </nav>
            </div>
        </header>

        <main class="max-w-6xl mx-auto px-6 py-10">
            <RouterView />
        </main>
    </div>
</template>
