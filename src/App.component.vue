<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
import fsLink from '@/core/design-system/fsLink.component.vue';

const { t } = useI18n();
</script>

<template>
    <div class="min-h-screen bg-slate-50">
        <header class="bg-indigo-100 border-b border-indigo-200">
            <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 class="font-semibold text-indigo-700 text-lg tracking-tight">
                    JobSearch
                </h1>

                <nav class="flex gap-8 text-indigo-600">
                    <fsLink to="/">
                        {{ t('navigation.home') }}
                    </fsLink>

                    <fsLink to="/trigger">
                        {{ t('navigation.trigger') }}
                    </fsLink>

                    <fsLink to="/jobs">
                        {{ t('navigation.jobs') }}
                    </fsLink>
                </nav>
            </div>
        </header>

        <main class="max-w-6xl mx-auto px-6 py-10">
            <RouterView />
        </main>
    </div>
</template>
