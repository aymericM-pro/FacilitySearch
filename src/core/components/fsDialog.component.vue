<script lang="ts" setup>
import { useDialogService } from '@/core/composables/dialog.composable';

const { state, close } = useDialogService();
</script>

<template>
    <div
        v-if="state.isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
    >
        <!-- overlay -->
        <div
            class="absolute inset-0 bg-black/40 backdrop-blur-sm"
            @click="close"
        ></div>

        <!-- modal -->
        <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 z-10">

            <!-- HEADER -->
            <div class="mb-6">
                <slot name="title" />
            </div>

            <!-- BODY -->
            <div class="text-gray-700 text-sm leading-relaxed">
                <slot />
            </div>

            <!-- FOOTER -->
            <div class="flex justify-end gap-3 pt-6">
                <slot name="actions" />
            </div>

        </div>
    </div>
</template>
