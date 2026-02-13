<script lang="ts" setup>
import { computed } from 'vue';

type Size = 'xs' | 'sm' | 'md' | 'lg'
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const props = defineProps<{
    size?: Size
    variant?: Variant
    disabled?: boolean
    full?: boolean
}>();

const sizeClass = computed(() => {
    switch (props.size) {
        case 'xs':
            return 'px-2 py-1 text-xs';
        case 'sm':
            return 'px-3 py-1.5 text-sm';
        case 'lg':
            return 'px-6 py-3 text-base';
        default:
            return 'px-5 py-2 text-sm';
    }
});

const variantClass = computed(() => {
    switch (props.variant) {
        case 'secondary':
            return 'bg-slate-200 text-slate-800 hover:bg-slate-300';
        case 'ghost':
            return 'bg-transparent text-indigo-600 hover:bg-indigo-50';
        case 'danger':
            return 'bg-red-600 text-white hover:bg-red-700';
        default:
            return 'bg-indigo-600 text-white hover:bg-indigo-700';
    }
});
</script>

<template>
    <button
        :class="[
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition shadow-sm',
      sizeClass,
      variantClass,
      full ? 'w-full' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
        :disabled="disabled"
    >
        <slot name="icon" />
        <slot />
    </button>
</template>
