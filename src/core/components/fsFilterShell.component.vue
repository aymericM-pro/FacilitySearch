<script generic="T" lang="ts" setup>
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    modelValue: T
    defaultValue: T
    close: () => void
}>();

const emit = defineEmits<(e: 'update:modelValue', value: T) => void>();

const localValue = ref<T>(
    props.modelValue ?? props.defaultValue,
);

watch(
    () => props.modelValue,
    v => {
        localValue.value = v ?? props.defaultValue;
    },
);

// ✅ fonction stable
function setLocal(v: T) {
    localValue.value = v;
}

const hasChanged = computed(() =>
    JSON.stringify(localValue.value) !==
    JSON.stringify(props.modelValue),
);

function apply() {
    if (!hasChanged.value) return;
    emit('update:modelValue', localValue.value);
    props.close();
}

function reset() {
    localValue.value = props.defaultValue;
    emit('update:modelValue', props.defaultValue);
    props.close();
}
</script>
<template>
    <div class="space-y-6 w-60">
        <slot
            :localValue="localValue"
            :setLocal="setLocal"
        />

        <div class="flex justify-end gap-4 pt-4 border-t border-slate-200">
            <button
                class="text-sm text-slate-500 hover:text-slate-700 transition"
                @click="reset"
            >
                Reset
            </button>

            <button
                :class="hasChanged
          ? 'bg-slate-900 text-white'
          : 'bg-slate-200 text-slate-400 cursor-not-allowed'"
                :disabled="!hasChanged"
                class="text-sm px-4 py-2 rounded-lg transition"
                @click="apply"
            >
                Apply
            </button>
        </div>
    </div>
</template>
