<script lang="ts" setup>
const props = defineProps<{
    modelValue: string | undefined
    label?: string
    error?: string | null
    placeholder?: string
    type?: string
}>();

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="flex flex-col gap-1">
        <label v-if="label" class="text-sm font-medium text-slate-700">
            {{ label }}
        </label>

        <div class="relative">
            <slot name="prefix" />

            <input
                :placeholder="placeholder"
                :type="type ?? 'text'"
                :value="modelValue"
                class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            />

            <slot name="suffix" />
        </div>

        <p v-if="error" class="text-xs text-red-600">
            {{ error }}
        </p>
    </div>
</template>
