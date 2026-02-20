<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useProfileStore } from '@/modules/profile/stores/profile.store.ts';
import ProfileSection from './ProfileSection.component.vue';

const { t } = useI18n();
const store = useProfileStore();
const emit = defineEmits<{ edit: [] }>();
</script>

<template>
    <ProfileSection
        :title="t('profile.sections.about')"
        :action-label="t('common.actions.edit')"
        icon="mdi-text-box-outline"
        @action="emit('edit')"
    >
        <div class="mt-4 text-gray-700 leading-relaxed">
            <strong>{{ t('profile.about.summary') }}</strong>
            <p class="mt-2">{{ store.profile.about }}</p>
        </div>
    </ProfileSection>
</template>
