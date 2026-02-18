<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import FilterShell from '@/core/components/fsFilterShell.component.vue';

defineProps<{
    modelValue: string | null;
    close: () => void;
}>();

const emit = defineEmits<(e: 'update:modelValue', value: string | null) => void>();

const { t } = useI18n();

const types = computed(() => [
    { label: t('jobs.filters.contract.all'), value: null },
    { label: t('jobs.filters.contract.cdi'), value: 'CDI' },
    { label: t('jobs.filters.contract.cdd'), value: 'CDD' },
    { label: t('jobs.filters.contract.freelance'), value: 'FREELANCE' },
    { label: t('jobs.filters.contract.internship'), value: 'INTERNSHIP' },
    { label: t('jobs.filters.contract.apprenticeship'), value: 'APPRENTICESHIP' },
]);
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
