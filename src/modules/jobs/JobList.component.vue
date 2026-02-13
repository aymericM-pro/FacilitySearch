<script lang="ts" setup>
import { computed, ref } from 'vue';
import fsBar from '@/core/components/fsBar.component.vue';
import fsJobCard, { type FsJob } from '@/modules/jobs/components/fsJobCard.component.vue';
import fsPagination from '@/core/design-system/fsPagination.component.vue';
import fsButton from '@/core/design-system/fsButton.component.vue';
import { jobList } from '@/modules/jobs/datas/jobs.data';

const jobs: FsJob[] = jobList;

const currentPage = ref(1);
const pageSize = 12;

const paginatedJobs = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return jobs.slice(start, start + pageSize);
});

const fileInput = ref<HTMLInputElement | null>(null);

const triggerImport = () => {
    fileInput.value?.click();
};

const handleCsvImport = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    console.log('CSV file selected:', file);
};
</script>
<template>
    <div class="max-w-6xl mx-auto space-y-8">

        <fsBar
            description="Browse available positions"
            title="Job Opportunities"
        >
            <template #actions>
                <fsButton
                    size="sm"
                    variant="secondary"
                    @click="triggerImport"
                >
                    Import CSV
                </fsButton>
            </template>
        </fsBar>

        <!-- Hidden file input -->
        <input
            ref="fileInput"
            accept=".csv"
            class="hidden"
            type="file"
            @change="handleCsvImport"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <fsJobCard
                v-for="job in paginatedJobs"
                :key="job.id"
                :job="job"
            />
        </div>

        <fsPagination
            v-model="currentPage"
            :page-size="pageSize"
            :total-items="jobs.length"
        />
    </div>
</template>
