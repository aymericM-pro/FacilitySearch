<script lang="ts" setup>
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
        <Transition name="sidebar-slide">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-end">
                <!-- Overlay -->
                <div
                    class="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    @click="emit('close')"
                />

                <!-- Panel -->
                <div class="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl">

                    <!-- Header -->
                    <div class="flex items-center justify-between px-6 py-4 border-b">
                        <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
                        <button
                            class="text-gray-400 hover:text-gray-600 transition"
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
                    <div class="flex justify-end gap-3 px-6 py-4 border-t">
                        <button
                            class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition"
                            @click="emit('close')"
                        >
                            Annuler
                        </button>
                        <button
                            class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition shadow-sm"
                            @click="emit('save')"
                        >
                            Enregistrer
                        </button>
                    </div>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
    transition: transform 0.3s ease, opacity 0.2s ease;
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
