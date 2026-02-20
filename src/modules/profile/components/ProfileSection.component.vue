<script lang="ts" setup>
defineProps<{
    title: string;
    icon?: string;
    actionLabel?: string;
}>();

const emit = defineEmits<{ action: [] }>();
</script>

<template>
    <section class="card">
        <div class="flex justify-between items-center">
            <h2 class="section-title flex items-center gap-2">
                <i v-if="icon" :class="`mdi ${icon} text-lg`"></i>
                {{ title }}
            </h2>
            <button
                v-if="actionLabel"
                class="text-indigo-600 hover:underline text-sm font-medium"
                @click="emit('action')"
            >
                {{ actionLabel }}
            </button>
        </div>
        <slot />
    </section>
</template>

<style scoped>
.card {
    @apply bg-white rounded-2xl shadow-sm border p-6;
}

.section-title {
    @apply text-lg font-semibold text-gray-800;
}
</style>
