<script lang="ts" setup>
import FilterShell from '@/core/components/fsFilterShell.component.vue';

defineProps<{
    modelValue: string | null;
    close: () => void;
}>();

const emit = defineEmits<(e: 'update:modelValue', value: string | null) => void>();

const types = [
    { label: 'All', value: null },
    { label: 'CDI', value: 'CDI' },
    { label: 'CDD', value: 'CDD' },
    { label: 'FREELANCE', value: 'FREELANCE' },
    { label: 'INTERNSHIP', value: 'INTERNSHIP' },
    { label: 'APPRENTICESHIP', value: 'APPRENTICESHIP' },
];
</script>

<template>
    <FilterShell
        :close="close"
        :default-value="null"
        :model-value="modelValue"
        @update:modelValue="emit('update:modelValue', $event)"
    >
        <template #default="{ localValue, setLocal }">

            <div class="space-y-4 text-sm">

                <label
                    v-for="option in types"
                    :key="option.label"
                    class="flex items-center gap-3 cursor-pointer"
                >
                    <input
                        :checked="localValue === option.value"
                        class="w-4 h-4 accent-slate-900"
                        type="radio"
                        @change="setLocal(option.value)"
                    />

                    <span>{{ option.label }}</span>
                </label>

            </div>

        </template>
    </FilterShell>
</template>
