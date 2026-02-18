<script lang="ts" setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

defineProps<{
    align?: 'left' | 'right';
}>();

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
        <Transition name="popover">
            <div
                v-if="open"
                :class="align === 'right' ? 'right-0' : 'left-0'"
                class="absolute top-full mt-2 bg-white rounded-xl shadow-lg p-6 z-50 min-w-[260px]"
                @click.stop
            >
                <slot :close="close" />
            </div>
        </Transition>

    </div>
</template>

<style scoped>
.popover-enter-active,
.popover-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.popover-enter-from,
.popover-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
