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

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        emit('update:modelValue', page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

        <!-- Pages -->
        <button
            v-for="page in totalPages"
            :key="page"
            :class="page === modelValue
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'hover:bg-slate-100'"
            class="px-3 py-1 text-sm rounded-lg border transition"
            @click="goToPage(page)"
        >
            {{ page }}
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
