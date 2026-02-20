import { defineStore } from 'pinia';
import { profile } from '@/modules/profile/datas/profile.data';
import type { Education, Experience, Profile } from '@/modules/profile/models/experience.model';

export const useProfileStore = defineStore('profile', () => {

    const updateHeader = (
        data: Pick<Profile, 'name' | 'title' | 'location' | 'available'>,
    ) => {
        Object.assign(profile, data);
    };

    const updateAbout = (about: string) => {
        profile.about = about;
    };

    const updateSkills = (skills: string[]) => {
        profile.skills = skills;
    };

    const saveExperience = (item: Experience | null, data: Experience) => {
        if (item) {
            Object.assign(item, data);
        } else {
            profile.experiences.push(data);
        }
    };

    const deleteExperience = (item: Experience) => {
        profile.experiences = profile.experiences.filter(e => e !== item);
    };

    const saveEducation = (item: Education | null, data: Education) => {
        if (item) {
            Object.assign(item, data);
        } else {
            profile.educations.push(data);
        }
    };

    const deleteEducation = (item: Education) => {
        profile.educations = profile.educations.filter(e => e !== item);
    };

    const updateContact = (
        data: Pick<Profile, 'email' | 'phone' | 'linkedin' | 'website' | 'address'>,
    ) => {
        Object.assign(profile, {
            email: data.email,
            phone: data.phone,
            linkedin: data.linkedin,
            website: data.website,
        });

        Object.assign(profile.address, data.address);
    };

    return {
        profile,
        updateHeader,
        updateAbout,
        updateSkills,
        saveExperience,
        deleteExperience,
        saveEducation,
        deleteEducation,
        updateContact,
    };
});
