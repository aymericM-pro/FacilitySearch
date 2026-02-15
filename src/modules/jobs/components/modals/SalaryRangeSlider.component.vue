<script lang="ts" setup>
import FilterShell from '@/core/components/fsFilterShell.component.vue';
import fsRangeSlider from '@/core/design-system/fsRangeSlider.component.vue';

const props = defineProps<{
    modelValue: [number, number] | null
    min: number
    max: number
    step: number
    close: () => void
}>();

const emit = defineEmits<(e: 'update:modelValue', value: [number, number] | null) => void>();

const defaultRange = (): [number, number] => [props.min, props.max];
</script>

<template>
    <FilterShell
        :close="close"
        :default-value="defaultRange()"
        :model-value="modelValue ?? defaultRange()"
        @update:modelValue="emit('update:modelValue', $event)"
    >
        <template #default="{ localValue, setLocal }">

            <div class="flex justify-between text-sm text-black">
                <span>{{ localValue[0].toLocaleString() }} €</span>
                <span>{{ localValue[1].toLocaleString() }} €</span>
            </div>

            <fsRangeSlider
                :max="max"
                :min="min"
                :model-value="localValue"
                :step="step"
                @update:modelValue="setLocal"
            />

        </template>
    </FilterShell>
</template>
