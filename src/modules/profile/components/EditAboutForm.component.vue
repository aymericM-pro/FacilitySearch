<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: { about: string };
}>();

const emit = defineEmits<{
    'update:modelValue': [value: typeof props.modelValue];
}>();

const local = ref(JSON.parse(JSON.stringify(props.modelValue)));

watch(local, (val) => emit('update:modelValue', val), { deep: true });
</script>

<template>
    <div class="space-y-2">
        <label class="text-sm font-medium text-slate-700">Résumé du profil</label>
        <textarea
            v-model="local.about"
            rows="8"
            placeholder="Décrivez votre profil..."
            class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none text-sm"
        />
    </div>
</template>
