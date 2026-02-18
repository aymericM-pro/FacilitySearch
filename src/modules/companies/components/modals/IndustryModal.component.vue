<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import FilterShell from '@/core/components/fsFilterShell.component.vue';
import api from '@/core/axios/axios.ts';

defineProps<{
    modelValue: string[]
    close: () => void
}>();

const emit = defineEmits<(e: 'update:modelValue', value: string[]) => void>();

const { t } = useI18n();
const search = ref('');
const allIndustries = ref<string[]>([]);
const loading = ref(false);

onMounted(async () => {
    if (allIndustries.value.length) return;

    loading.value = true;
    try {
        const res = await api.get('/companies/industries');
        allIndustries.value = res.data;
    } finally {
        loading.value = false;
    }
});

const filteredIndustries = computed(() => {
    if (!search.value) return allIndustries.value;

    return allIndustries.value.filter(industry =>
        industry.toLowerCase().includes(search.value.toLowerCase()),
    );
});

const toggleIndustry = (industry: string, current: string[]) => {
    return current.includes(industry)
        ? current.filter(i => i !== industry)
        : [...current, industry];
};
</script>

<template>
    <FilterShell
        :close="close"
        :default-value="[]"
        :model-value="modelValue"
        @update:modelValue="emit('update:modelValue', $event)"
    >
        <template #default="{ localValue, setLocal }">

            <input
                v-model="search"
                class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-slate-900"
                :placeholder="t('companies.filters.industry.searchPlaceholder')"
                type="text"
            />

            <div v-if="loading" class="text-xs text-slate-400 py-2">
                {{ t('companies.filters.industry.loading') }}
            </div>

            <div
                v-else
                class="max-h-56 overflow-y-auto text-sm"
            >
                <label
                    v-for="industry in filteredIndustries"
                    :key="industry"
                    class="flex items-center gap-3 w-full px-4 py-3
         cursor-pointer transition-colors duration-150
         hover:bg-slate-100"
                >
                    <input
                        :checked="localValue.includes(industry)"
                        class="w-4 h-4 accent-slate-900"
                        type="checkbox"
                        @change="setLocal(toggleIndustry(industry, localValue))"
                    />

                    <span class="text-sm font-medium tracking-wide">
    {{ industry }}
  </span>
                </label>

                <div
                    v-if="filteredIndustries.length === 0"
                    class="text-xs text-slate-400 px-4 py-2"
                >
                    {{ t('companies.filters.industry.noResults') }}
                </div>
            </div>

        </template>
    </FilterShell>
</template>
