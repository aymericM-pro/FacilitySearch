<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    modelValue: [number, number] | null
    min: number
    max: number
    step?: number
}>();

const emit = defineEmits<(e: 'update:modelValue', value: [number, number]) => void>();

const resolveInitial = (): [number, number] => {
    if (props.modelValue) return [...props.modelValue];
    return [props.min, props.max];
};

const localValue = ref<[number, number]>(resolveInitial());

watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            localValue.value = [...val];
        } else {
            localValue.value = [props.min, props.max];
        }
    },
    { immediate: true },
);

watch(
    localValue,
    ([minVal, maxVal]) => {
        let safeMin = minVal;
        let safeMax = maxVal;

        if (safeMin > safeMax) {
            [safeMin, safeMax] = [safeMax, safeMin];
            localValue.value = [safeMin, safeMax];
        }

        emit('update:modelValue', [safeMin, safeMax]);
    },
    { deep: true },
);

const minPercent = computed(
    () => ((localValue.value[0] - props.min) / (props.max - props.min)) * 100,
);

const maxPercent = computed(
    () => ((localValue.value[1] - props.min) / (props.max - props.min)) * 100,
);
</script>

<template>
    <div class="relative h-6 w-full">

        <!-- rail -->
        <div
            class="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 rounded bg-gray-200"
        />

        <!-- active range -->
        <div
            :style="{ left: minPercent + '%', width: maxPercent - minPercent + '%' }"
            class="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-black"
        />

        <!-- min slider -->
        <input
            v-model.number="localValue[0]"
            :max="max"
            :min="min"
            :step="step || 1"
            class="range-input absolute inset-0 z-10"
            type="range"
        />

        <!-- max slider -->
        <input
            v-model.number="localValue[1]"
            :max="max"
            :min="min"
            :step="step || 1"
            class="range-input absolute inset-0 z-20"
            type="range"
        />

    </div>
</template>

<style scoped>
.range-input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    appearance: none;
    background: transparent;
}

.range-input::-webkit-slider-thumb {
    pointer-events: auto;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 9999px;
    background-color: #000;
    border: 3px solid #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    cursor: pointer;
}

.range-input::-moz-range-thumb {
    pointer-events: auto;
    width: 18px;
    height: 18px;
    border-radius: 9999px;
    background-color: #000;
    border: 3px solid #fff;
    cursor: pointer;
}
</style>
