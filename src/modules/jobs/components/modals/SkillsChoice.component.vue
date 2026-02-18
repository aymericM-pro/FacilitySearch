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
const allSkills = ref<string[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
    loading.value = true;
    error.value = null;

    try {
        const { data } = await api.get('/skills', {
            params: { size: 1000 },
        });

        allSkills.value = data.content.map((s: any) => s.name);

    } catch (err: any) {
        error.value = err?.message || 'Failed to load skills';
    } finally {
        loading.value = false;
    }
});

const filteredSkills = computed(() => {
    if (!search.value) return allSkills.value;

    return allSkills.value.filter(skill =>
        skill.toLowerCase().includes(search.value.toLowerCase()),
    );
});

const toggleSkill = (skill: string, list: string[]) => {
    return list.includes(skill)
        ? list.filter(s => s !== skill)
        : [...list, skill];
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
                :placeholder="t('jobs.filters.skills.searchPlaceholder')"
                type="text"
            />

            <div class="max-h-56 overflow-y-auto space-y-4 text-sm">

                <label
                    v-for="skill in filteredSkills"
                    :key="skill"
                    class="flex items-center gap-3 cursor-pointer"
                >
                    <input
                        :checked="localValue.includes(skill)"
                        class="w-4 h-4 accent-slate-900"
                        type="checkbox"
                        @change="setLocal(toggleSkill(skill, localValue))"
                    />

                    <span>{{ skill }}</span>
                </label>

                <div
                    v-if="filteredSkills.length === 0"
                    class="text-xs text-slate-400"
                >
                    {{ t('jobs.filters.skills.noResults') }}
                </div>

            </div>

        </template>


    </FilterShell>
</template>
