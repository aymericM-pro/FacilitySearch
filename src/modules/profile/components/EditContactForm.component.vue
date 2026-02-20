<script lang="ts" setup>
import { ref, watch } from 'vue';
import fsInput from '@/core/design-system/fsInput.component.vue';

type ContactData = {
    email: string;
    phone: string;
    linkedin: string;
    website: string;
    address: {
        street: string;
        city: string;
        postal: string;
    };
};

const props = defineProps<{
    modelValue: ContactData;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: ContactData];
}>();

const local = ref<ContactData>(JSON.parse(JSON.stringify(props.modelValue)));

watch(local, (val) => emit('update:modelValue', val), { deep: true });
</script>

<template>
    <div class="space-y-4">
        <fsInput v-model="local.email" label="Email" placeholder="votre@email.com" type="email" />
        <fsInput v-model="local.phone" label="Téléphone" placeholder="+33 6 12 34 56 78" type="tel" />
        <fsInput v-model="local.linkedin" label="LinkedIn" placeholder="linkedin.com/in/profil" />
        <fsInput v-model="local.website" label="Site web" placeholder="monsite.dev" />

        <div class="pt-2 border-t">
            <p class="text-sm font-medium text-slate-700 mb-3">Adresse postale</p>
            <div class="space-y-3">
                <fsInput v-model="local.address.street" label="Rue" placeholder="123 Rue de la République" />
                <fsInput v-model="local.address.city" label="Ville" placeholder="Paris" />
                <fsInput v-model="local.address.postal" label="Code postal" placeholder="75001" />
            </div>
        </div>
    </div>
</template>
