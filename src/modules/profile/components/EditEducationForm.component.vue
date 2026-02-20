<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import fsInput from '@/core/design-system/fsInput.component.vue';

const { t } = useI18n();

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
        <fsInput
            v-model="local.school"
            :label="t('profile.form.education.school')"
            :placeholder="t('profile.form.education.schoolPlaceholder')"
        />
        <fsInput
            v-model="local.degree"
            :label="t('profile.form.education.degree')"
            :placeholder="t('profile.form.education.degreePlaceholder')"
        />
        <fsInput
            v-model="local.period"
            :label="t('profile.form.education.period')"
            :placeholder="t('profile.form.education.periodPlaceholder')"
        />
        <fsInput
            v-model="local.location"
            :label="t('profile.form.education.location')"
            :placeholder="t('profile.form.education.locationPlaceholder')"
        />
        <fsInput
            v-model="local.field"
            :label="t('profile.form.education.field')"
            :placeholder="t('profile.form.education.fieldPlaceholder')"
        />
        <fsInput
            v-model="local.logo"
            :label="t('profile.form.education.logo')"
            placeholder="https://..."
        />
    </div>
</template>
