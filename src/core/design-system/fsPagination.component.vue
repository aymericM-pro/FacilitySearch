<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
    modelValue: number
    totalItems: number
    pageSize: number
}>();

const emit = defineEmits<(e: 'update:modelValue', value: number) => void>();

const totalPages = computed(() =>
    Math.ceil(props.totalItems / props.pageSize),
);

const firstVisiblePage = computed<number>(() =>
    visiblePages.value.length ? visiblePages.value[0]! : 1,
);

const lastVisiblePage = computed<number>(() =>
    visiblePages.value.length
        ? visiblePages.value[visiblePages.value.length - 1]!
        : totalPages.value,
);


const visiblePages = computed(() => {
    const pages: number[] = [];
    const current = props.modelValue;
    const total = totalPages.value;

    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
});

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value && page !== props.modelValue) {
        emit('update:modelValue', page);
    }
};
</script>
<template>
    <div
        v-if="totalPages > 1"
        class="flex justify-center items-center gap-1 pt-6"
    >
        <!-- Prev -->
        <button
            :disabled="modelValue === 1"
            class="px-3 py-1 text-sm rounded-lg border transition
                   hover:bg-slate-100 disabled:opacity-40"
            @click="goToPage(modelValue - 1)"
        >
            ←
        </button>

        <!-- First page -->
        <button
            v-if="firstVisiblePage > 1"
            class="px-3 py-1 text-sm rounded-lg border hover:bg-slate-100 transition"
            @click="goToPage(1)"
        >
            1
        </button>

        <span
            v-if="firstVisiblePage > 2"
            class="px-2 text-slate-400"
        >
            ...
        </span>

        <!-- Visible pages -->
        <button
            v-for="page in visiblePages"
            :key="page"
            :class="page === modelValue
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'hover:bg-slate-100'"
            class="px-3 py-1 text-sm rounded-lg border transition"
            @click="goToPage(page)"
        >
            {{ page }}
        </button>

        <span
            v-if="lastVisiblePage < totalPages - 1"
            class="px-2 text-slate-400"
        >
            ...
        </span>

        <!-- Last page -->
        <button
            v-if="lastVisiblePage < totalPages"
            class="px-3 py-1 text-sm rounded-lg border hover:bg-slate-100 transition"
            @click="goToPage(totalPages)"
        >
            {{ totalPages }}
        </button>

        <!-- Next -->
        <button
            :disabled="modelValue === totalPages"
            class="px-3 py-1 text-sm rounded-lg border transition
                   hover:bg-slate-100 disabled:opacity-40"
            @click="goToPage(modelValue + 1)"
        >
            →
        </button>
    </div>
</template>
