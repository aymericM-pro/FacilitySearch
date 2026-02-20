<script lang="ts" setup>
import fsBar from '@/core/components/fsBar.component.vue';
import fsPagination from '@/core/design-system/fsPagination.component.vue';
import ViewToggle from '@/core/design-system/fsViewToggle.component.vue';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

const contentRef = ref<HTMLElement | null>(null);

watch(() => props.modelValue, () => {
    contentRef.value?.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>

<template>
    <div class="max-w-6xl mx-auto h-full flex flex-col gap-6">

        <fsBar class="flex-shrink-0" :description="description" :title="title" />

        <!-- Top row -->
        <div class="flex-shrink-0 flex items-center justify-between gap-6">
            <slot name="filters" />

            <div class="flex items-center gap-4">
                <input
                    class="px-4 py-2 border border-slate-300 rounded-lg text-sm w-64
                 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    :placeholder="t('common.search.placeholder')"
                    @input="emit('search', ($event.target as HTMLInputElement).value)"
                />

                <ViewToggle
                    :model-value="viewMode"
                    @update:modelValue="emit('update:viewMode', $event)"
                />
            </div>
        </div>

        <!-- Results header -->
        <div class="flex-shrink-0 flex justify-between items-center text-sm text-slate-500">
            <span>{{ t('common.listing.results', { count: totalItems }) }}</span>
            <span>{{ t('common.listing.page', { current: modelValue, total: totalPages }) }}</span>
        </div>

        <!-- Error -->
        <div
            v-if="error"
            class="flex-shrink-0 p-4 rounded-lg bg-red-50 text-red-600 text-sm"
        >
            {{ error }}
        </div>

        <!-- Loading -->
        <div
            v-if="loading"
            class="flex-shrink-0 text-center py-12 text-slate-500"
        >
            {{ t('common.search.loading') }}
        </div>

        <!-- Content -->
        <div
            v-else
            ref="contentRef"
            class="flex-1 min-h-0 overflow-y-auto"
        >
            <slot />
        </div>

        <!-- Pagination -->
        <div class="flex-shrink-0">
            <fsPagination
                :model-value="modelValue"
                :page-size="pageSize"
                :total-items="totalItems"
                @update:modelValue="emit('update:modelValue', $event)"
            />
        </div>

    </div>
</template>
