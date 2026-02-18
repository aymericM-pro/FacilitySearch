<script lang="ts" setup>
import { RouterView } from 'vue-router';
import AppSidebar from '@/core/components/fsSidebar.component.vue';
import AppToasts from '@/core/design-system/fsToast.component.vue';
import AppHeader from '@/core/components/AppHeader.component.vue';
</script>

<template>
    <div class="min-h-screen flex bg-slate-50">

        <AppSidebar />

        <div class="flex-1 flex flex-col">

            <AppHeader />

            <main class="flex-1 px-10 py-8">
                <RouterView />
            </main>
            <AppToasts />

        </div>
    </div>
</template>
