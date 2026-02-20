<script lang="ts" setup>
defineProps<{
    isOpen: boolean
    title: string
    width?: string // ex: w-96 | max-w-md | w-[420px]
}>();

const emit = defineEmits<{
    close: []
}>();
</script>

<template>
    <Teleport to="body">

        <!-- Backdrop -->
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
                :class="[
                    'fixed right-0 top-0 h-full bg-white shadow-2xl z-50 flex flex-col will-change-transform',
                    width ?? 'w-96'
                ]"
            >
                <!-- Header -->
                <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div class="flex items-center gap-3">
                        <h2 class="text-lg font-semibold text-gray-800">
                            {{ title }}
                        </h2>
                        <slot name="header-extra" />
                    </div>

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

                <!-- Footer (optionnel) -->
                <div v-if="$slots.footer"
                     class="px-6 py-4 border-t border-gray-100">
                    <slot name="footer" />
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
