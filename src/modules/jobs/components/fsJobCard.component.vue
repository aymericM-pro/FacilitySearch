<script lang="ts" setup>
import { useNavigation } from '@/core/composables/navigation.composable.ts';
import { AppRoute } from '@/router';

export interface FsJob {
    id: string;
    title: string;
    company: string;
    location: string;
    tags: string[];

    remote?: boolean | null;
    contractType?: string | null;
    salaryMin?: number | null;
    salaryMax?: number | null;
}

const props = defineProps<{
    job: FsJob
}>();

const emit = defineEmits<(e: 'apply', job: FsJob) => void>();
const { goToWithParams } = useNavigation();


const handleApply = () => {
    emit('apply', props.job);
};


const goToDetail = () => {
    goToWithParams(AppRoute.JOB_DETAIL, {
        id: props.job.id,
    });
};


const formatSalary = (min?: number | null, max?: number | null) => {
    if (!min && !max) return '';

    if (min && max) return `${min}€ - ${max}€`;
    if (min) return `From ${min}€`;
    if (max) return `Up to ${max}€`;

    return '';
};


</script>

<template>
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">

        <!-- TOP -->
        <div class="space-y-3">

            <div>
                <h3 class="text-lg font-semibold text-slate-800">
                    {{ job.title }}
                </h3>

                <p class="text-sm text-slate-500">
                    {{ job.company }} · {{ job.location }}
                </p>
            </div>

            <!-- BADGES -->
            <div class="flex flex-wrap gap-2">

                <!-- Contract -->
                <span
                    v-if="job.contractType"
                    class="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700"
                >
          {{ job.contractType }}
        </span>

                <!-- Remote -->
                <span
                    v-if="job.remote === true"
                    class="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700"
                >
          Remote
        </span>

                <span
                    v-if="job.remote === false"
                    class="px-2 py-1 text-xs rounded-full bg-slate-200 text-slate-600"
                >
          On-site
        </span>

            </div>

            <!-- SALARY -->
            <div
                v-if="job.salaryMin || job.salaryMax"
                class="text-sm font-medium text-slate-700"
            >
                {{ formatSalary(job.salaryMin, job.salaryMax) }}
            </div>

            <!-- TAGS -->
            <div class="flex flex-wrap gap-2 pt-2">
        <span
            v-for="tag in job.tags"
            :key="tag"
            class="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700"
        >
          {{ tag }}
        </span>
            </div>

        </div>

        <!-- ACTIONS -->
        <div class="flex gap-3 pt-5">
            <button class="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm" @click="goToDetail">
                View details
            </button>

            <button class="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm">
                Apply
            </button>
        </div>

    </div>
</template>
