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

    const uploadProfilePhoto = async (id: string, formData: FormData) => {
        const { data } = await api.post(
            `/profiles/${id}/photo`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
        );

        if (profile.value) {
            profile.value.photoUrl = data.photoUrl;
        }
    };

    const createExperience = async (payload: any) => {
        const { data } = await api.post('/experiences', payload);
        profile.value?.experiences.push(data);
    };

    const updateExperience = async (id: string, payload: any) => {
        const { data } = await api.put(`/experiences/${id}`, payload);

        if (profile.value) {
            const index = profile.value.experiences.findIndex(e => e.id === id);
            if (index !== -1) profile.value.experiences[index] = data;
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
            if (index !== -1) profile.value.educations[index] = data;
        }
    };

    const deleteEducation = async (id: string) => {
        await api.delete(`/educations/${id}`);

        if (profile.value) {
            profile.value.educations =
                profile.value.educations.filter(e => e.id !== id);
        }
    };

    const generateCv = async (id: string) => {
        const response = await api.get(`/profiles/${id}/pdf`, {
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    return {
        profile,
        loadProfile,
        updateHeader,
        uploadProfilePhoto,
        generateCv,
        createExperience,
        updateExperience,
        deleteExperience,
        createEducation,
        updateEducation,
        deleteEducation,
    };
});
