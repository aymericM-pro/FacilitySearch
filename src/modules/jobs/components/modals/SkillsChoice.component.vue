<script lang="ts" setup>
import { computed, ref } from 'vue';
import FilterShell from '@/core/components/fsFilterShell.component.vue';

const props = defineProps<{
    modelValue: string[];
    allSkills: string[];
    close: () => void;
}>();

const emit = defineEmits<(e: 'update:modelValue', value: string[]) => void>();

const search = ref('');

const filteredSkills = computed(() => {
    if (!search.value) return props.allSkills;

    return props.allSkills.filter(skill =>
        skill.toLowerCase().includes(search.value.toLowerCase()),
    );
});

const toggleSkill = (skill: string, list: string[]) => {
    if (list.includes(skill)) {
        return list.filter(s => s !== skill);
    }
    return [...list, skill];
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
                placeholder="Search skills..."
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
                    No results
                </div>

            </div>

        </template>


    </FilterShell>
</template>
