<script lang="ts" setup>
import { ref, watch } from 'vue';
import fsInput from '@/core/design-system/fsInput.component.vue';

type Education = {
    school: string;
    degree: string;
    period: string;
    location: string;
    field?: string;
    logo?: string;
};

const props = defineProps<{
    modelValue: Education;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: Education];
}>();

const local = ref<Education>(JSON.parse(JSON.stringify(props.modelValue)));

watch(local, (val) => emit('update:modelValue', val), { deep: true });
</script>

<template>
    <div class="space-y-4">
        <fsInput v-model="local.school" label="École / Université" placeholder="Ex: EFREI Paris" />
        <fsInput v-model="local.degree" label="Diplôme" placeholder="Ex: Ingénieur" />
        <fsInput v-model="local.period" label="Période" placeholder="Ex: 2018 - 2023" />
        <fsInput v-model="local.location" label="Lieu" placeholder="Ex: Paris" />
        <fsInput v-model="local.field" label="Domaine (optionnel)" placeholder="Ex: Ingénierie logicielle" />
        <fsInput v-model="local.logo" label="Logo (URL, optionnel)" placeholder="https://..." />
    </div>
</template>
