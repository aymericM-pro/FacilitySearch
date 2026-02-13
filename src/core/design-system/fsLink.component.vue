<script lang="ts" setup>
import { RouterLink } from 'vue-router';

defineProps<{
    to: string
}>();
</script>

<template>
    <RouterLink
        :to="to"
        class="group relative inline-block font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-800 hover:-translate-y-[1px]"
    >
        <span class="relative z-10">
            <slot />
        </span>

        <span
            class="absolute left-0 -bottom-1 h-[2px] w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"
        />
    </RouterLink>
</template>
