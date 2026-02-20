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
    if (items.value.length) return;
    loading.value = true;
    try {
        const res = await api.get('/addresses/cities');
        items.value = res.data;
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
        :search-placeholder="t('companies.filters.city.searchPlaceholder')"
        :empty-text="t('companies.filters.city.noResults')"
        @update:model-value="emit('update:modelValue', $event)"
    />
</template>
