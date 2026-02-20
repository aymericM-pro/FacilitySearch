<script lang="ts" setup>
import { ref, watch } from 'vue';
import fsInput from '@/core/design-system/fsInput.component.vue';

const props = defineProps<{
    modelValue: {
        name: string;
        title: string;
        location: string;
        available: boolean;
    };
}>();

const emit = defineEmits<{
    'update:modelValue': [value: typeof props.modelValue];
}>();

const local = ref(JSON.parse(JSON.stringify(props.modelValue)));

watch(local, (val) => emit('update:modelValue', val), { deep: true });
</script>

<template>
    <div class="space-y-4">
        <fsInput v-model="local.name" label="Nom complet" placeholder="Prénom Nom" />
        <fsInput v-model="local.title" label="Titre / Poste" placeholder="Ex: Software Engineer" />
        <fsInput v-model="local.location" label="Localisation" placeholder="Ex: Paris, France" />

        <div class="flex items-center justify-between py-2">
            <span class="text-sm font-medium text-slate-700">Disponible</span>
            <button
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition"
                :class="local.available ? 'bg-indigo-600' : 'bg-gray-300'"
                @click="local.available = !local.available"
            >
                <span
                    class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition"
                    :class="local.available ? 'translate-x-6' : 'translate-x-1'"
                />
            </button>
        </div>
    </div>
</template>
