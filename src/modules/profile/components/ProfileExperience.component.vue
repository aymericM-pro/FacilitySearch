<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useProfileStore } from '@/modules/profile/stores/profile.store';
import ProfileSection from './ProfileSection.component.vue';
import type { Experience } from '@/modules/profile/models/experience.model';

const { t } = useI18n();
const store = useProfileStore();

const emit = defineEmits<{
    edit: [item: Experience]
    create: []
    delete: [item: Experience]
}>();
</script>

<template>
    <ProfileSection
        v-if="store.profile"
        :action-label="t('common.actions.create')"
        :title="t('profile.sections.experience')"
        icon="mdi-briefcase-outline"
        @action="emit('create')"
    >
        <div class="mt-8">
            <div
                v-for="(exp, index) in store.profile.experiences"
                :key="exp.id"
            >
                <div class="flex items-start gap-5 py-6 hover:bg-gray-50 transition rounded-lg px-2">

                    <div
                        class="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center border shadow-sm flex-shrink-0">
                        <img
                            v-if="exp.logo"
                            :src="exp.logo"
                            alt="Logo"
                            class="w-8 h-8 object-contain"
                        />
                        <i v-else class="mdi mdi-office-building text-gray-400 text-2xl"></i>
                    </div>

                    <div class="flex-1">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="font-semibold text-gray-800 text-base">{{ exp.role }}</h3>
                                <p class="text-sm text-gray-600 mt-1">{{ exp.company }}</p>
                            </div>

                            <div class="flex items-center gap-4">
                                <button
                                    class="text-indigo-600 hover:text-indigo-800 transition"
                                    @click="emit('edit', exp)"
                                >
                                    <i class="mdi mdi-pencil-outline text-lg"></i>
                                </button>
                                <button
                                    class="text-red-600 hover:text-red-800 transition"
                                    @click="emit('delete', exp)"
                                >
                                    <i class="mdi mdi-delete-outline text-lg"></i>
                                </button>
                            </div>
                        </div>

                        <div class="flex gap-6 mt-3 text-sm text-gray-500">
                            <div class="flex items-center gap-2">
                                <i class="mdi mdi-calendar-month-outline"></i>
                                {{ exp.period }}
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="mdi mdi-map-marker-outline"></i>
                                {{ exp.location }}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    v-if="index !== store.profile.experiences.length - 1"
                    class="border-t border-gray-200"
                />
            </div>
        </div>
    </ProfileSection>
</template>
