<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import fsButton from '@/core/design-system/fsButton.component.vue';
import fsLink from '@/core/design-system/fsLink.component.vue';

const { t } = useI18n();
</script>

<template>
    <div class="space-y-6">
        <h2 class="text-3xl font-semibold text-slate-800">
            {{ t('home.title') }}
        </h2>

        <p class="text-slate-600 max-w-xl">
            {{ t('home.description') }}
        </p>

        <fsLink to="/trigger">
            {{ t('common.actions.goToTrigger') }}
        </fsLink>

        <fsButton size="md" variant="primary">
            {{ t('common.actions.triggerJob') }}
        </fsButton>
    </div>
</template>
