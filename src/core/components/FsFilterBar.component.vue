<script lang="ts" setup>
import BasePopover from '@/core/design-system/fsPopover.component.vue';
import fsButton from '@/core/design-system/fsButton.component.vue';

defineProps<{
    filters: Record<string, any>
    config: {
        key: string
        label: string
        component: any
        props?: () => Record<string, any>
    }[]
}>();
</script>

<template>
    <div class="flex items-center gap-3">
        <BasePopover
            v-for="filter in config"
            :key="filter.key"
        >
            <template #trigger>
                <fsButton size="md" variant="secondary">
                    {{ filter.label }}
                </fsButton>
            </template>

            <template #default="{ close }">
                <component
                    :is="filter.component"
                    v-model="filters[filter.key]"
                    :close="close"
                    v-bind="filter.props ? filter.props() : {}"
                />
            </template>
        </BasePopover>
    </div>
</template>
