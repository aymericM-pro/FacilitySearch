<script lang="ts" setup>
import { ref, watch } from 'vue';
import fsInput from '@/core/design-system/fsInput.component.vue';
import type { Experience } from '@/modules/profile/models/experience.model.ts';

const props = defineProps<{
    modelValue: Experience;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: Experience];
}>();

const local = ref<Experience>(JSON.parse(JSON.stringify(props.modelValue)));

watch(local, (val) => emit('update:modelValue', val), { deep: true });
</script>

<template>
    <div class="space-y-4">
        <fsInput v-model="local.company" label="Entreprise" placeholder="Ex: Google" />
        <fsInput v-model="local.role" label="Poste / Rôle" placeholder="Ex: Software Engineer" />
        <fsInput v-model="local.period" label="Période" placeholder="Ex: Jan 2023 - Présent" />
        <fsInput v-model="local.location" label="Lieu" placeholder="Ex: Paris" />
        <fsInput v-model="local.logo" label="Logo (URL, optionnel)" placeholder="https://..." />
    </div>
</template>
