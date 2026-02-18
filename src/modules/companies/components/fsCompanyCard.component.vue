<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import type { AppRouteName } from '@/router';
import { useNavigation } from '@/core/composables/navigation.composable.ts';

export interface FsCompany {
    id: string;
    name: string;
    city?: string | null;
    createdAt?: string | null;
}

const props = defineProps<{
    company: FsCompany
}>();

const { t } = useI18n();
const { goToWithParams } = useNavigation();

const formatDate = (date?: string | null) => {
    if (!date) {
        return '';
    }

    return new Date(date).toLocaleDateString();
};

const goToDetails = () => {
    goToWithParams('company-detail' as AppRouteName, {
        id: props.company.id,
    });
};
</script>

<template>
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">

        <div class="space-y-3">
            <h3 class="text-lg font-semibold text-slate-800">
                {{ company.name }}
            </h3>

            <p v-if="company.city" class="text-sm text-slate-500">
                {{ company.city }}
            </p>

            <p v-if="company.createdAt" class="text-xs text-slate-400">
                {{ t('companies.card.createdAt', { date: formatDate(company.createdAt) }) }}
            </p>
        </div>

        <div class="pt-5">
            <button class="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm" @click="goToDetails">
                {{ t('companies.card.viewDetails') }}
            </button>
        </div>

    </div>
</template>
