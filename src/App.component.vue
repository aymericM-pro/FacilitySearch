<script lang="ts" setup>
import { RouterView } from 'vue-router';
import AppSidebar from '@/core/components/fsSidebar.component.vue';
import AppMobileMenu from '@/core/components/AppMobileMenu.component.vue';
import AppNotifications from '@/core/components/AppNotifications.component.vue';
import AppToasts from '@/core/design-system/fsToast.component.vue';
import AppHeader from '@/core/components/AppHeader.component.vue';
import { useSidebarStore } from '@/core/stores/useSidebarStore.store';

const sidebar = useSidebarStore();
</script>

<template>
    <div class="h-screen overflow-hidden flex bg-slate-50">

        <div class="hidden lg:block">
            <AppSidebar />
        </div>

        <div class="flex-1 flex flex-col min-w-0">
            <AppHeader />

            <Transition name="slide-down">
                <div
                    v-if="sidebar.isOpen"
                    class="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white shadow-xl">
                    >
                    <AppMobileMenu />
                </div>
            </Transition>

            <main class="flex-1 min-h-0 overflow-y-auto px-10 py-8">
                <RouterView />
            </main>
            <AppToasts />
        </div>

        <AppNotifications />

    </div>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
    transition: transform 0.3s ease, opacity 0.2s ease;
}

.slide-down-enter-from {
    transform: translateY(-100%);
    opacity: 0;
}

.slide-down-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
</style>
