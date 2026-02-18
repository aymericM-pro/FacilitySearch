<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import FilterShell from '@/core/components/fsFilterShell.component.vue';

defineProps<{
    modelValue: string[]
    close: () => void
}>();

const emit = defineEmits<(e: 'update:modelValue', value: string[]) => void>();

const { t } = useI18n();
const search = ref('');
const allEnterprises = ref<string[]>([]);
const loading = ref(false);

/* ---------------------------
   LAZY LOAD
---------------------------- */

onMounted(async () => {
    if (allEnterprises.value.length) return;

    loading.value = true;
    try {
        const res = await axios.get('http://localhost:8080/api/companies?size=1000');
        allEnterprises.value = res.data.content.map((c: any) => c.name);
    } finally {
        loading.value = false;
    }
});

/* ---------------------------
   FILTER
---------------------------- */

const filteredEnterprises = computed(() => {
    if (!search.value) return allEnterprises.value;

    return allEnterprises.value.filter(company =>
        company.toLowerCase().includes(search.value.toLowerCase()),
    );
});

const toggleEnterprise = (company: string, current: string[]) => {
    return current.includes(company)
        ? current.filter(c => c !== company)
        : [...current, company];
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
                :placeholder="t('jobs.filters.enterprise.searchPlaceholder')"
                type="text"
            />

            <div
                v-if="loading"
                class="text-xs text-slate-400 py-2"
            >
                {{ t('jobs.filters.enterprise.loading') }}
            </div>

            <div
                v-else
                class="max-h-56 overflow-y-auto space-y-4 text-sm"
            >
                <label
                    v-for="company in filteredEnterprises"
                    :key="company"
                    class="flex items-center gap-3 cursor-pointer"
                >
                    <input
                        :checked="localValue.includes(company)"
                        class="w-4 h-4 accent-slate-900"
                        type="checkbox"
                        @change="setLocal(toggleEnterprise(company, localValue))"
                    />

                    <span>{{ company }}</span>
                </label>

                <div
                    v-if="filteredEnterprises.length === 0"
                    class="text-xs text-slate-400"
                >
                    {{ t('jobs.filters.enterprise.noResults') }}
                </div>
            </div>

        </template>
    </FilterShell>
</template>
