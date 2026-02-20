<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import fsInput from '@/core/design-system/fsInput.component.vue';
import type { Experience } from '@/modules/profile/models/experience.model.ts';

const { t } = useI18n();

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
        <fsInput
            v-model="local.company"
            :label="t('profile.form.experience.company')"
            :placeholder="t('profile.form.experience.companyPlaceholder')"
        />
        <fsInput
            v-model="local.role"
            :label="t('profile.form.experience.role')"
            :placeholder="t('profile.form.experience.rolePlaceholder')"
        />
        <fsInput
            v-model="local.period"
            :label="t('profile.form.experience.period')"
            :placeholder="t('profile.form.experience.periodPlaceholder')"
        />
        <fsInput
            v-model="local.location"
            :label="t('profile.form.experience.location')"
            :placeholder="t('profile.form.experience.locationPlaceholder')"
        />
        <fsInput
            v-model="local.logo"
            :label="t('profile.form.experience.logo')"
            placeholder="https://..."
        />
    </div>
</template>
