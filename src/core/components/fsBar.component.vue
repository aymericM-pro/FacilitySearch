<script lang="ts" setup>
import fsLink from '@/core/design-system/fsLink.component.vue';

defineProps<{
    title: string
    description?: string
    logo?: string
    showBack?: boolean
    backTo?: string
}>();
</script>

<template>
    <div class="space-y-4">

        <!-- Back -->
        <div v-if="showBack">
            <fsLink :to="backTo || '/'">
                ← Back
            </fsLink>
        </div>

        <!-- Main Row -->
        <div class="flex items-start justify-between">

            <!-- Left -->
            <div class="flex items-start gap-4">

                <img
                    v-if="logo"
                    :src="logo"
                    alt="Logo"
                    class="w-14 h-14 rounded-xl border"
                />

                <div>
                    <h1 class="text-3xl font-semibold text-slate-800">
                        {{ title }}
                    </h1>

                    <p
                        v-if="description"
                        class="text-slate-600 mt-1"
                    >
                        {{ description }}
                    </p>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
                <slot name="actions" />
            </div>

        </div>
    </div>
</template>
