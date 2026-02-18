<script lang="ts" setup>
import { RouterView } from 'vue-router';
import AppSidebar from '@/core/components/fsSidebar.component.vue';
import AppMobileMenu from '@/core/components/AppMobileMenu.component.vue';
import AppToasts from '@/core/design-system/fsToast.component.vue';
import AppHeader from '@/core/components/AppHeader.component.vue';
import { useSidebarStore } from '@/core/stores/useSidebarStore.store';

const sidebar = useSidebarStore();
</script>

<template>
    <div class="min-h-screen flex bg-slate-50">

        <div class="hidden lg:block">
            <AppSidebar />
        </div>

        <div class="flex-1 flex flex-col min-w-0">
            <AppHeader />

            <Transition name="slide-down">
                <AppMobileMenu v-if="sidebar.isOpen" class="lg:hidden" />
            </Transition>

            <main class="flex-1 px-10 py-8">
                <RouterView />
            </main>
            <AppToasts />
        </div>

    </div>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
