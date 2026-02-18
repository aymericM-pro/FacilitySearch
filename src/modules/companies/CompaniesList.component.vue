<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import fsCompanyCard, { type FsCompany } from '@/modules/companies/components/fsCompanyCard.component.vue';
import FsListingLayout from '@/core/components/FsListingLayout.component.vue';
import FsFilterBar from '@/core/components/FsFilterBar.component.vue';

import { useCompanies } from '@/modules/companies/composables/useCompanies.composable';
import { useCompanyFilterConfig } from '@/modules/companies/composables/useCompanyConfig.composable';
import type { CompanyFilters } from '@/modules/companies/composables/useCompanyFilters.composable';

const { t } = useI18n();
const currentPage = ref(1);
const pageSize = 8;
const search = ref('');
const viewMode = ref<'card' | 'list'>('card');

const filters = ref<CompanyFilters>({
    companyType: [],
    industry: [],
    city: [],
});

const filterConfig = useCompanyFilterConfig();

const {
    companies,
    totalItems,
    loading,
    error,
    loadCompanies,
} = useCompanies();

const filteredCompanies = computed<FsCompany[]>(() => {
    let result = companies.value;

    if (search.value) {
        result = result.filter(c =>
            c.name.toLowerCase().includes(search.value.toLowerCase()),
        );
    }

    if (filters.value.companyType?.length) {
        result = result.filter(c =>
            filters.value.companyType.includes(c.id),
        );
    }

    return result;
});

watch(currentPage, () => {
    loadCompanies(currentPage.value, pageSize);
});

onMounted(() => {
    loadCompanies(currentPage.value, pageSize);
});
</script>

<template>
    <FsListingLayout
        v-model="currentPage"
        v-model:viewMode="viewMode"
        :error="error"
        :loading="loading"
        :page-size="pageSize"
        :total-items="totalItems"
        :description="t('companies.list.description')"
        :title="t('companies.list.title')"
        @search="val => search = val"
    >
        <!-- Filters -->
        <template #filters>
            <FsFilterBar
                :config="filterConfig"
                :filters="filters"
            />
        </template>

        <!-- Companies -->
        <template #default>
            <div
                v-if="filteredCompanies.length > 0"
                :class="viewMode === 'card'
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'flex flex-col gap-4'"
            >
                <fsCompanyCard
                    v-for="company in filteredCompanies"
                    :key="company.id"
                    :company="company"
                />
            </div>

            <div
                v-else
                class="text-center py-12 text-slate-400"
            >
                {{ t('companies.list.empty') }}
            </div>
        </template>
    </FsListingLayout>
</template>
