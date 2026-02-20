<script lang="ts" setup>
import { useProfileStore } from '@/modules/profile/stores/profile.store.ts';
import ProfileSection from './ProfileSection.component.vue';

const store = useProfileStore();

const emit = defineEmits<{
    edit: [item: any];
    create: [];
    delete: [item: any];
}>();
</script>

<template>
    <ProfileSection
        title="Éducation"
        icon="mdi-school-outline"
        action-label="Créer"
        @action="emit('create')"
    >
        <div class="mt-8">
            <div
                v-for="(edu, index) in store.profile.educations"
                :key="edu.school + index"
            >
                <div class="flex items-start gap-5 py-6 hover:bg-gray-50 transition rounded-lg px-2">

                    <div class="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center border shadow-sm flex-shrink-0">
                        <img
                            v-if="edu.logo"
                            :src="edu.logo"
                            alt="Logo école"
                            class="w-8 h-8 object-contain"
                        />
                        <i v-else class="mdi mdi-school text-gray-400 text-2xl"></i>
                    </div>

                    <div class="flex-1">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="font-semibold text-gray-800 text-base">{{ edu.degree }}</h3>
                                <p class="text-sm text-gray-600 mt-1">{{ edu.school }}</p>
                            </div>

                            <div class="flex items-center gap-4">
                                <button
                                    class="text-indigo-600 hover:text-indigo-800 transition"
                                    @click="emit('edit', edu)"
                                >
                                    <i class="mdi mdi-pencil-outline text-lg"></i>
                                </button>
                                <button
                                    class="text-red-600 hover:text-red-800 transition"
                                    @click="emit('delete', edu)"
                                >
                                    <i class="mdi mdi-delete-outline text-lg"></i>
                                </button>
                            </div>
                        </div>

                        <div class="flex gap-6 mt-3 text-sm text-gray-500">
                            <div class="flex items-center gap-2">
                                <i class="mdi mdi-calendar-range-outline"></i>
                                {{ edu.period }}
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="mdi mdi-map-marker-outline"></i>
                                {{ edu.location }}
                            </div>
                        </div>

                        <div v-if="edu.field" class="mt-3 text-sm text-gray-600">
                            {{ edu.field }}
                        </div>
                    </div>
                </div>

                <div
                    v-if="index !== store.profile.educations.length - 1"
                    class="border-t border-gray-200"
                />
            </div>
        </div>
    </ProfileSection>
</template>
