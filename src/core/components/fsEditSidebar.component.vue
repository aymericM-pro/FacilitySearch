<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
    isOpen: boolean;
    title: string;
}>();

const emit = defineEmits<{
    close: [];
    save: [];
}>();
</script>

<template>
    <Teleport to="body">
        <!-- Overlay -->
        <Transition name="fade">
            <div
                v-if="isOpen"
                class="fixed inset-0 bg-black/40 z-50"
                @click="emit('close')"
            />
        </Transition>

        <!-- Panel -->
        <Transition name="slide-right">
            <div
                v-if="isOpen"
                class="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col will-change-transform">
                <!-- Header -->
                <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
                    <button
                        class="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition"
                        @click="emit('close')"
                    >
                        <i class="mdi mdi-close text-xl"></i>
                    </button>
                </div>

                <!-- Body -->
                <div class="flex-1 overflow-y-auto px-6 py-6">
                    <slot />
                </div>

                <!-- Footer -->
                <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
                    <button
                        class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition"
                        @click="emit('close')"
                    >
                        {{ t('common.actions.cancel') }}
                    </button>
                    <button
                        class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition shadow-sm"
                        @click="emit('save')"
                    >
                        {{ t('common.actions.save') }}
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
    transform: translateX(100%);
}
</style>
