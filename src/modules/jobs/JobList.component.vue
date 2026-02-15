<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue';
import fsJobCard, { type FsJob } from '@/modules/jobs/components/fsJobCard.component.vue';
import BasePopover from '@/core/design-system/fsPopover.component.vue';
import fsButton from '@/core/design-system/fsButton.component.vue';
import fsPagination from '@/core/design-system/fsPagination.component.vue';
import fsBar from '@/core/components/fsBar.component.vue';

import { useJobFilters } from '@/modules/jobs/composables/useJobFilters.composable';
import { useJobPagination } from '@/modules/jobs/composables/useJobPagination.composable';
import { useJobLoader } from '@/modules/jobs/composables/useJobLoader.composable';
import { useJobFilterConfig } from '@/modules/jobs/datas/filters.datas.ts';

const { filters } = useJobFilters();
const { currentPage, pageSize } = useJobPagination();
const { jobs, totalItems, loading, error, loadJobs } = useJobLoader();

const allSkills = computed(() => {
    const set = new Set<string>();
    jobs.value.forEach(j => j.tags.forEach(t => set.add(t)));
    return Array.from(set).sort();
});

const allEnterprises = computed(() => {
    const set = new Set<string>();
    jobs.value.forEach(j => set.add(j.company));
    return Array.from(set).sort();
});

const filterConfig = useJobFilterConfig(allSkills, allEnterprises);

const mappedJobs = computed<FsJob[]>(() =>
    jobs.value.map(job => ({
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
    <div class="relative">
        <div class="max-w-6xl mx-auto space-y-6">

            <fsBar
                description="Browse available positions"
                title="Job Opportunities"
            />

            <!-- FILTERS -->
            <div class="flex items-center gap-3">
                <BasePopover
                    v-for="filter in filterConfig"
                    :key="filter.key"
                >
                    <template #trigger>
                        <fsButton size="md" variant="secondary">
                            {{ filter.label }}
                        </fsButton>
                    </template>

                    <template #default="{ close }">
                        <component
                            :is="filter.component"
                            v-model="filters[filter.key]"
                            :close="close"
                            v-bind="filter.props ? filter.props() : {}"
                        />
                    </template>
                </BasePopover>
            </div>

            <div
                v-if="error"
                class="p-4 rounded-lg bg-red-50 text-red-600 text-sm"
            >
                {{ error }}
            </div>

            <div
                v-if="loading"
                class="text-center py-12 text-slate-500"
            >
                Loading...
            </div>

            <div
                v-else-if="mappedJobs.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
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

            <fsPagination
                v-model="currentPage"
                :page-size="pageSize"
                :total-items="totalItems"
            />

        </div>
    </div>
</template>
