<script lang="ts" setup>
import { ref, watch } from 'vue';
import fsInput from '@/core/design-system/fsInput.component.vue';

const props = defineProps<{
    modelValue: { skills: string[] };
}>();

const emit = defineEmits<{
    'update:modelValue': [value: typeof props.modelValue];
}>();

const local = ref<{ skills: string[] }>(JSON.parse(JSON.stringify(props.modelValue)));
const newSkill = ref('');

watch(local, (val) => emit('update:modelValue', val), { deep: true });

const addSkill = () => {
    const trimmed = newSkill.value.trim();
    if (trimmed && !local.value.skills.includes(trimmed)) {
        local.value.skills.push(trimmed);
    }
    newSkill.value = '';
};

const removeSkill = (index: number) => {
    local.value.skills.splice(index, 1);
};
</script>

<template>
    <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
            <span
                v-for="(skill, i) in local.skills"
                :key="skill"
                class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-gray-100 text-gray-700"
            >
                {{ skill }}
                <button
                    type="button"
                    class="text-gray-400 hover:text-red-500 transition ml-1"
                    @click="removeSkill(i)"
                >
                    <i class="mdi mdi-close text-xs"></i>
                </button>
            </span>
        </div>

        <div class="flex gap-2">
            <fsInput
                v-model="newSkill"
                placeholder="Ajouter une compétence"
                class="flex-1"
                @keydown.enter.prevent="addSkill"
            />
            <button
                type="button"
                class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition"
                @click="addSkill"
            >
                Ajouter
            </button>
        </div>
    </div>
</template>
