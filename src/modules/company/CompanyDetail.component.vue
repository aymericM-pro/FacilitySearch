<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import fsJobCard from '@/modules/jobs/components/fsJobCard.component.vue';
import fsPagination from '@/core/design-system/fsPagination.component.vue';
import { useCompanyJobOffers } from '@/modules/company/composables/useCompanyJobOffers.composable';

const { t } = useI18n();
const route = useRoute();
const companyId = route.params.id as string;

const page = ref(0);
const size = 8;

const { jobOffers, totalItems, loading, load } =
    useCompanyJobOffers();

onMounted(() => {
    load(companyId, page.value, size);
});

watch(page, () => {
    load(companyId, page.value, size);
});
</script>

<template>
    <div class="max-w-6xl mx-auto space-y-8">

        <h1 class="text-2xl font-semibold">
            {{ t('companies.detail.title') }}
        </h1>

        <div v-if="loading">{{ t('companies.detail.loading') }}</div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <fsJobCard
                v-for="job in jobOffers"
                :key="job.id"
                :job="job"
            />
        </div>

        <fsPagination
            v-if="totalItems > size"
            v-model="page"
            :page-size="size"
            :total-items="totalItems"
        />
    </div>
</template>
