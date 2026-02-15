<script lang="ts" setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const open = ref(false);
const root = ref<HTMLElement | null>(null);

const toggle = () => (open.value = !open.value);
const close = () => (open.value = false);

onClickOutside(root, () => {
    if (open.value) close();
});
</script>

<template>
    <div ref="root" class="relative inline-block">

        <!-- Trigger -->
        <div @click="toggle">
            <slot name="trigger" />
        </div>

        <!-- Popover -->
        <div
            v-if="open"
            class="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg p-6 z-50 min-w-[260px]"
            @click.stop
        >
            <slot :close="close" />
        </div>

    </div>
</template>
