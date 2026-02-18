<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import fsJobCard, { type FsJob } from '@/modules/jobs/components/fsJobCard.component.vue';
import FsListingLayout from '@/core/components/FsListingLayout.component.vue';
import FsFilterBar from '@/core/components/FsFilterBar.component.vue';
import { useJobFilters } from '@/modules/jobs/composables/useJobFilters.composable';
import { useJobPagination } from '@/modules/jobs/composables/useJobPagination.composable';
import { useJobLoader } from '@/modules/jobs/composables/useJobLoader.composable';
import { useJobFilterConfig } from '@/modules/jobs/datas/filters.datas';

const { filters } = useJobFilters();
const { currentPage, pageSize } = useJobPagination();
const { jobs, totalItems, loading, error, loadJobs } = useJobLoader();

const search = ref('');
const viewMode = ref<'card' | 'list'>('card');

const filterConfig = useJobFilterConfig();

const filteredJobs = computed(() => {
    if (!search.value) return jobs.value;

    return jobs.value.filter(j =>
        j.title.toLowerCase().includes(search.value.toLowerCase()),
    );
});

const mappedJobs = computed<FsJob[]>(() =>
    filteredJobs.value.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location ?? '',
        tags: job.tags,
        remote: job.remote,
        contractType: job.contractType,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
    })),
);

watch(
    filters,
    () => {
        currentPage.value = 1;
        loadJobs(filters, currentPage.value, pageSize);
    },
    { deep: true },
);

watch(currentPage, () => {
    loadJobs(filters, currentPage.value, pageSize);
});

onMounted(() => {
    loadJobs(filters, currentPage.value, pageSize);
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
        description="Browse available positions"
        title="Job Opportunities"
        @search="val => search = val"
    >
        <!-- Filters -->
        <template #filters>
            <FsFilterBar
                :config="filterConfig"
                :filters="filters"
            />
        </template>

        <!-- Jobs -->
        <template #default>
            <div
                v-if="mappedJobs.length > 0"
                :class="viewMode === 'card'
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'flex flex-col gap-4'"
            >
                <fsJobCard
                    v-for="job in mappedJobs"
                    :key="job.id"
                    :job="job"
                />
            </div>

            <div
                v-else
                class="text-center py-12 text-slate-400"
            >
                No jobs found.
            </div>
        </template>
    </FsListingLayout>
</template>
