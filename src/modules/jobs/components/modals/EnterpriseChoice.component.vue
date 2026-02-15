<script lang="ts" setup>
import { computed, ref } from 'vue';
import FilterShell from '@/core/components/fsFilterShell.component.vue';

const props = defineProps<{
    modelValue: string[];
    allEnterprises: string[];
    close: () => void;
}>();

const emit = defineEmits<(e: 'update:modelValue', value: string[]) => void>();

const search = ref('');

const filteredEnterprises = computed(() => {
    if (!search.value) return props.allEnterprises;

    return props.allEnterprises.filter(company =>
        company.toLowerCase().includes(search.value.toLowerCase()),
    );
});

const toggleEnterprise = (company: string, current: string[]) => {
    if (current.includes(company)) {
        return current.filter(c => c !== company);
    }
    return [...current, company];
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
                placeholder="Search company..."
                type="text"
            />

            <div class="max-h-56 overflow-y-auto space-y-4 text-sm">

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

            </div>

        </template>

    </FilterShell>
</template>
