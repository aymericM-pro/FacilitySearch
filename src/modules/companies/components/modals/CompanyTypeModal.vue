<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import FilterShell from '@/core/components/fsFilterShell.component.vue';
import api from '@/core/axios/axios.ts';

defineProps<{
    modelValue: string[]
    close: () => void
}>();

const emit = defineEmits<(e: 'update:modelValue', value: string[]) => void>();

const search = ref('');
const allTypes = ref<string[]>([]);
const loading = ref(false);

onMounted(async () => {
    if (allTypes.value.length) return;

    loading.value = true;
    try {
        const res = await api.get('/companies/types');
        allTypes.value = res.data;
    } finally {
        loading.value = false;
    }
});

const filteredTypes = computed(() => {
    if (!search.value) return allTypes.value;

    return allTypes.value.filter(type =>
        type.toLowerCase().includes(search.value.toLowerCase()),
    );
});

const toggleType = (type: string, current: string[]) => {
    return current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type];
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
                placeholder="Search type..."
                type="text"
            />

            <div
                v-if="loading"
                class="text-xs text-slate-400 py-2"
            >
                Loading types...
            </div>

            <div
                v-else
                class="max-h-56 overflow-y-auto text-sm"
            >
                <label
                    v-for="type in filteredTypes"
                    :key="type"
                    class="flex items-center gap-3 w-full px-4 py-3
           cursor-pointer transition-colors duration-150
           hover:bg-slate-100"
                >
                    <input
                        :checked="localValue.includes(type)"
                        class="w-4 h-4 accent-slate-900"
                        type="checkbox"
                        @change="setLocal(toggleType(type, localValue))"
                    />

                    <span class="text-sm font-medium tracking-wide">
      {{ type }}
    </span>
                </label>

                <div
                    v-if="filteredTypes.length === 0"
                    class="text-xs text-slate-400 px-4 py-2"
                >
                    No results
                </div>
            </div>


        </template>
    </FilterShell>
</template>
