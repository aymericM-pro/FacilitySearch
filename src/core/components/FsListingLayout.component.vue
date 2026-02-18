<script lang="ts" setup>
import fsBar from '@/core/components/fsBar.component.vue';
import fsPagination from '@/core/design-system/fsPagination.component.vue';
import ViewToggle from '@/core/design-system/fsViewToggle.component.vue';
import { computed } from 'vue';

const props = defineProps<{
    title: string
    description: string
    totalItems: number
    pageSize: number
    loading: boolean
    error: string | null
    modelValue: number
    viewMode: 'card' | 'list'
}>();

const emit = defineEmits([
    'update:modelValue',
    'update:viewMode',
    'search',
]);

const totalPages = computed(() =>
    Math.max(1, Math.ceil(props.totalItems / props.pageSize)),
);
</script>

<template>
    <div class="max-w-6xl mx-auto space-y-6">

        <fsBar :description="description" :title="title" />

        <!-- Top row -->
        <div class="flex items-center justify-between gap-6">
            <slot name="filters" />

            <div class="flex items-center gap-4">
                <input
                    class="px-4 py-2 border border-slate-300 rounded-lg text-sm w-64
                 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="Search..."
                    @input="emit('search', ($event.target as HTMLInputElement).value)"
                />

                <ViewToggle
                    :model-value="viewMode"
                    @update:modelValue="emit('update:viewMode', $event)"
                />
            </div>
        </div>

        <!-- Results header -->
        <div class="flex justify-between items-center text-sm text-slate-500">
            <span>{{ totalItems }} results</span>
            <span>Page {{ modelValue }} / {{ totalPages }}</span>
        </div>

        <!-- Error -->
        <div
            v-if="error"
            class="p-4 rounded-lg bg-red-50 text-red-600 text-sm"
        >
            {{ error }}
        </div>

        <!-- Loading -->
        <div
            v-if="loading"
            class="text-center py-12 text-slate-500"
        >
            Loading...
        </div>

        <!-- Content -->
        <div v-else>
            <slot />
        </div>

        <!-- Pagination -->
        <fsPagination
            :model-value="modelValue"
            :page-size="pageSize"
            :total-items="totalItems"
            @update:modelValue="emit('update:modelValue', $event)"
        />

    </div>
</template>
