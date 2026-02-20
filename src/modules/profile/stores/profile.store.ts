import { defineStore } from 'pinia';
import api from '@/core/axios/axios';
import { ref } from 'vue';
import type { Profile } from '@/modules/profile/models/experience.model';

export const useProfileStore = defineStore('profile', () => {

    const profile = ref<Profile | null>(null);

    const loadProfile = async (id: string) => {
        const { data: profileData } = await api.get(`/profiles/${id}`);

        const { data: experiences } = await api.get(`/experiences/profile/${id}`);
        const { data: educations } = await api.get(`/educations/profile/${id}`);

        profile.value = {
            ...profileData,
            experiences,
            educations,
        };
    };

    const updateHeader = async (id: string, payload: any) => {
        const { data } = await api.put(`/profiles/${id}`, payload);
        profile.value = data;
    };

    const createExperience = async (payload: any) => {
        const { data } = await api.post('/experiences', payload);
        profile.value?.experiences.push(data);
    };

    const updateExperience = async (id: string, payload: any) => {
        const { data } = await api.put(`/experiences/${id}`, payload);

        if (profile.value) {
            const index = profile.value.experiences.findIndex(e => e.id === id);
            if (index !== -1) {
                profile.value.experiences[index] = data;
            }
        }
    };

    const deleteExperience = async (id: string) => {
        await api.delete(`/experiences/${id}`);

        if (profile.value) {
            profile.value.experiences =
                profile.value.experiences.filter(e => e.id !== id);
        }
    };
    
    const createEducation = async (payload: any) => {
        const { data } = await api.post('/educations', payload);
        profile.value?.educations.push(data);
    };

    const updateEducation = async (id: string, payload: any) => {
        const { data } = await api.put(`/educations/${id}`, payload);

        if (profile.value) {
            const index = profile.value.educations.findIndex(e => e.id === id);
            if (index !== -1) {
                profile.value.educations[index] = data;
            }
        }
    };

    const deleteEducation = async (id: string) => {
        await api.delete(`/educations/${id}`);

        if (profile.value) {
            profile.value.educations =
                profile.value.educations.filter(e => e.id !== id);
        }
    };

    return {
        profile,
        loadProfile,
        updateHeader,

        createExperience,
        updateExperience,
        deleteExperience,

        createEducation,
        updateEducation,
        deleteEducation,
    };
});
