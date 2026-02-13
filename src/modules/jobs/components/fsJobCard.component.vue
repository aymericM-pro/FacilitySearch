<script lang="ts" setup>
import { useRouter } from 'vue-router';
import fsButton from '@/core/design-system/fsButton.component.vue';

export type FsJob = {
    id: number
    title: string
    company: string
    location: string
    tags?: string[]
}

const props = defineProps<{
    job: FsJob
}>();

const emit = defineEmits<(e: 'apply', job: FsJob) => void>();

const router = useRouter();

const handleApply = () => {
    emit('apply', props.job);
};

const goToDetail = () => {
    router.push(`/jobs/${props.job.id}`);
};
</script>

<template>
    <div
        class="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between
           shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-200"
    >
        <!-- Contenu -->
        <div class="space-y-2">
            <h3 class="font-semibold text-slate-800">
                {{ job.title }}
            </h3>

            <p class="text-sm text-slate-500">
                {{ job.company }} · {{ job.location }}
            </p>

            <div
                v-if="job.tags?.length"
                class="flex flex-wrap gap-2 pt-2"
            >
        <span
            v-for="tag in job.tags"
            :key="tag"
            class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md"
        >
          {{ tag }}
        </span>
            </div>
        </div>

        <!-- Actions -->
        <div class="pt-4 flex gap-3">
            <fsButton
                size="sm"
                variant="secondary"
                @click="goToDetail"
            >
                View details
            </fsButton>

            <fsButton
                size="sm"
                variant="primary"
                @click="handleApply"
            >
                Apply
            </fsButton>
        </div>
    </div>
</template>
