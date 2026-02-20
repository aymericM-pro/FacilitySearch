<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import fsFilterSelect from '@/core/design-system/fsFilterSelect.component.vue';
import api from '@/core/axios/axios.ts';

defineProps<{
    modelValue: string[];
    close: () => void;
}>();

const emit = defineEmits<(e: 'update:modelValue', value: string[]) => void>();

const { t } = useI18n();
const items = ref<string[]>([]);
const loading = ref(false);

onMounted(async () => {
    loading.value = true;
    try {
        const { data } = await api.get('/skills', { params: { size: 1000 } });
        items.value = data.content.map((s: any) => s.name);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <fsFilterSelect
        :close="close"
        :items="items"
        :loading="loading"
        :model-value="modelValue"
        :search-placeholder="t('jobs.filters.skills.searchPlaceholder')"
        :empty-text="t('jobs.filters.skills.noResults')"
        @update:model-value="emit('update:modelValue', $event)"
    />
</template>
