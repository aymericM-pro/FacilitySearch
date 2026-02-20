<script lang="ts" setup>
import { useProfileStore } from '@/modules/profile/stores/profile.store.ts';
import ProfileSection from './ProfileSection.component.vue';

const store = useProfileStore();
const emit = defineEmits<{ edit: [] }>();
</script>

<template>
    <ProfileSection
        title="À propos"
        icon="mdi-text-box-outline"
        action-label="Modifier"
        @action="emit('edit')"
    >
        <div class="mt-4 text-gray-700 leading-relaxed">
            <strong>Résumé du profil :</strong>
            <p class="mt-2">{{ store.profile.about }}</p>
        </div>
    </ProfileSection>
</template>
