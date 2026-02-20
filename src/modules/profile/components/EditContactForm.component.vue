<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import fsInput from '@/core/design-system/fsInput.component.vue';

const { t } = useI18n();

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
        <fsInput
            v-model="local.email"
            :label="t('profile.form.contact.email')"
            :placeholder="t('profile.form.contact.emailPlaceholder')"
            type="email"
        />
        <fsInput
            v-model="local.phone"
            :label="t('profile.form.contact.phone')"
            :placeholder="t('profile.form.contact.phonePlaceholder')"
            type="tel"
        />
        <fsInput
            v-model="local.linkedin"
            :label="t('profile.form.contact.linkedin')"
            :placeholder="t('profile.form.contact.linkedinPlaceholder')"
        />
        <fsInput
            v-model="local.website"
            :label="t('profile.form.contact.website')"
            :placeholder="t('profile.form.contact.websitePlaceholder')"
        />

        <div class="pt-2 border-t">
            <p class="text-sm font-medium text-slate-700 mb-3">{{ t('profile.form.contact.postalAddress') }}</p>
            <div class="space-y-3">
                <fsInput
                    v-model="local.address.street"
                    :label="t('profile.form.contact.street')"
                    :placeholder="t('profile.form.contact.streetPlaceholder')"
                />
                <fsInput
                    v-model="local.address.city"
                    :label="t('profile.form.contact.city')"
                    :placeholder="t('profile.form.contact.cityPlaceholder')"
                />
                <fsInput
                    v-model="local.address.postal"
                    :label="t('profile.form.contact.postal')"
                    :placeholder="t('profile.form.contact.postalPlaceholder')"
                />
            </div>
        </div>
    </div>
</template>
