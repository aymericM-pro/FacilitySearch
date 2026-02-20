<script lang="ts" setup>
import { useProfileStore } from '@/modules/profile/stores/profile.store.ts';
import ProfileSection from './ProfileSection.component.vue';

const store = useProfileStore();
const emit = defineEmits<{ edit: [] }>();
</script>

<template>
    <ProfileSection title="Compétences" action-label="Modifier" @action="emit('edit')">
        <div class="flex flex-wrap gap-3 mt-6">
            <span
                v-for="skill in store.profile.skills"
                :key="skill"
                class="px-3 py-1.5 rounded-lg text-sm bg-gray-100 text-gray-700"
            >
                {{ skill }}
            </span>
        </div>
    </ProfileSection>
</template>
