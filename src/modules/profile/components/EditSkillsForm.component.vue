<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import fsCheckboxSearch from '@/core/design-system/fsCheckboxSearch.component.vue';

const SUGGESTED_SKILLS = [
    'Java', 'Kotlin', 'Spring Boot', 'Spring Security',
    'Angular', 'Vue.js', 'React', 'TypeScript', 'JavaScript',
    'Node.js', 'Python', 'Go', 'Rust',
    'Docker', 'Kubernetes', 'Terraform', 'Ansible',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
    'AWS', 'GCP', 'Azure',
    'Git', 'CI/CD', 'GraphQL', 'REST API',
];

const props = defineProps<{
    modelValue: { skills: string[] };
}>();

const emit = defineEmits<{
    'update:modelValue': [value: typeof props.modelValue];
}>();

const local = ref<{ skills: string[] }>(JSON.parse(JSON.stringify(props.modelValue)));

watch(local, (val) => emit('update:modelValue', val), { deep: true });

// Merge suggested list with any custom skills already in the profile
const allItems = computed(() => {
    const custom = local.value.skills.filter((s) => !SUGGESTED_SKILLS.includes(s));
    return [...SUGGESTED_SKILLS, ...custom];
});
</script>

<template>
    <fsCheckboxSearch
        :items="allItems"
        :model-value="local.skills"
        search-placeholder="Rechercher une compétence..."
        empty-text="Aucune compétence trouvée"
        @update:model-value="local.skills = $event"
    />
</template>
