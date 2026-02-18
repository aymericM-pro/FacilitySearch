<script lang="ts" setup>
const props = defineProps<{
    modelValue: 'card' | 'list'
}>();

const emit = defineEmits<(e: 'update:modelValue', value: 'card' | 'list') => void>();

const setMode = (mode: 'card' | 'list') => {
    if (mode !== props.modelValue) {
        emit('update:modelValue', mode);
    }
};
</script>

<template>
    <div class="flex bg-slate-200 rounded-xl p-1 w-fit">

        <!-- CARDS -->
        <button
            :class="[
        'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all',
        modelValue === 'card'
          ? 'bg-indigo-600 text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-300'
      ]"
            @click="setMode('card')"
        >
            <i class="mdi mdi-view-grid-outline text-base"></i>
            Cards
        </button>

        <!-- LIST -->
        <button
            :class="[
        'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all',
        modelValue === 'list'
          ? 'bg-indigo-600 text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-300'
      ]"
            @click="setMode('list')"
        >
            <i class="mdi mdi-format-list-bulleted text-base"></i>
            List
        </button>

    </div>
</template>
