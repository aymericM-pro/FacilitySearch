<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { AppRoute } from '@/router';
import { useAuth } from '@/core/composables/useAuth.composable.ts';
import FsHeader from '@/core/design-system/fsHeader.component.vue';
import FsPopover from '@/core/design-system/fsPopover.component.vue';
import ProfileModal from '@/core/components/fsProfileModal.component.vue';
import { useSidebarStore } from '@/core/stores/useSidebarStore.store';
import { useNotificationStore } from '@/core/stores/useNotificationStore.store';

const { t } = useI18n();
const router = useRouter();
const { token, logout, user } = useAuth();
const sidebar = useSidebarStore();
const notifications = useNotificationStore();

const isAuthenticated = computed(() => !!token.value);

const userName = computed(() => user.value?.name || 'User');
const userEmail = computed(() => user.value?.email || '');

const userInitials = computed(() =>
    userName.value
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase(),
);

const handleLogout = (close: () => void) => {
    close();
    logout();
    router.push('/');
};
</script>

<template>
    <FsHeader>
        <template #left>
            <button
                class="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
                @click="sidebar.toggle()"
            >
                <i class="mdi mdi-menu text-xl"></i>
            </button>

            <h2
                v-if="isAuthenticated"
                class="hidden lg:block text-2xl font-semibold text-gray-800"
            >
                {{ t('header.greeting', { name: userName }) }}
            </h2>
        </template>

        <template #right>
            <template v-if="isAuthenticated">

                <div class="relative hidden md:flex">
                    <input
                        class="w-64 rounded-lg border border-gray-200 bg-white px-4 py-2 pr-10 text-sm outline-none transition focus:border-indigo-500"
                        :placeholder="t('header.search')"
                        type="text"
                    />
                    <i class="mdi mdi-magnify absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                </div>

                <button
                    class="hidden sm:flex p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition relative"
                    @click="notifications.toggle()"
                >
                    <i class="mdi mdi-bell-outline text-xl"></i>
                    <span
                        v-if="notifications.unreadCount > 0"
                        class="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500"
                    />
                </button>

                <button class="hidden sm:flex p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition">
                    <i class="mdi mdi-cog-outline text-xl"></i>
                </button>

                <FsPopover align="right">
                    <template #trigger>
                        <div
                            class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm transition hover:scale-105 cursor-pointer"
                        >
                            {{ userInitials }}
                        </div>
                    </template>

                    <template #default="{ close }">
                        <ProfileModal
                            :user-email="userEmail"
                            :user-initials="userInitials"
                            :user-name="userName"
                            @close="close()"
                            @logout="handleLogout(close)"
                        />
                    </template>
                </FsPopover>

            </template>

            <template v-else>

                <button
                    class="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium
                           text-gray-700 hover:bg-gray-100 transition"
                    @click="router.push({ name: AppRoute.LOGIN })"
                >
                    {{ t('auth.login') }}
                </button>

                <button
                    class="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium
                           hover:bg-indigo-700 transition"
                    @click="router.push({ name: AppRoute.REGISTER })"
                >
                    {{ t('auth.register') }}
                </button>

            </template>
        </template>
    </FsHeader>
</template>
