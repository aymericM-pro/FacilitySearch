<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useProfileStore } from '@/modules/profile/stores/profile.store.ts';
import { useDialogService } from '@/core/composables/dialog.composable.ts';
import type { EditSection } from '@/core/composables/editSidebar.composable.ts';
import { useEditSidebarService } from '@/core/composables/editSidebar.composable.ts';
import fsDialog from '@/core/components/fsDialog.component.vue';
import fsSidebarPanel from '@/core/components/fsSidebarPanel.component.vue';

import ProfileHeader from '@/modules/profile/components/ProfileHeader.component.vue';
import ProfileAbout from '@/modules/profile/components/ProfileAbout.component.vue';
import ProfileSkills from '@/modules/profile/components/ProfileSkills.component.vue';
import ProfileExperience from '@/modules/profile/components/ProfileExperience.component.vue';
import ProfileEducation from '@/modules/profile/components/ProfileEducation.component.vue';
import ProfileContact from '@/modules/profile/components/ProfileContact.component.vue';
import EditHeaderForm from '@/modules/profile/components/EditHeaderForm.component.vue';
import EditAboutForm from '@/modules/profile/components/EditAboutForm.component.vue';
import EditSkillsForm from '@/modules/profile/components/EditSkillsForm.component.vue';
import EditExperienceForm from '@/modules/profile/components/EditExperienceForm.component.vue';
import EditEducationForm from '@/modules/profile/components/EditEducationForm.component.vue';
import EditContactForm from '@/modules/profile/components/EditContactForm.component.vue';

const store = useProfileStore();
const dialog = useDialogService();
const editSidebar = useEditSidebarService();

const formData = ref<any>(null);

type SectionHandler = {
    title: string | ((s: EditSection) => string);
    init: (s: EditSection) => any;
    save: (data: any, s: EditSection) => void;
};

const sectionHandlers: Record<EditSection['type'], SectionHandler> = {
    header: {
        title: 'Modifier le profil',
        init: () => {
            const p = store.profile;
            return { name: p.name, title: p.title, location: p.location, available: p.available };
        },
        save: (data) => store.updateHeader(data),
    },
    about: {
        title: 'Modifier le résumé',
        init: () => ({ about: store.profile.about }),
        save: (data) => store.updateAbout(data.about),
    },
    skills: {
        title: 'Modifier les compétences',
        init: () => ({ skills: [...store.profile.skills] }),
        save: (data) => store.updateSkills(data.skills),
    },
    experience: {
        title: (s) => (s as { type: 'experience'; item: any }).item
            ? `Modifier – ${(s as any).item.company}`
            : 'Nouvelle expérience',
        init: (s) => {
            const item = (s as { type: 'experience'; item: any }).item;
            return item
                ? JSON.parse(JSON.stringify(item))
                : { company: '', role: '', period: '', location: '', logo: '' };
        },
        save: (data, s) => store.saveExperience((s as any).item, data),
    },
    education: {
        title: (s) => (s as { type: 'education'; item: any }).item
            ? `Modifier – ${(s as any).item.school}`
            : 'Nouvelle formation',
        init: (s) => {
            const item = (s as { type: 'education'; item: any }).item;
            return item
                ? JSON.parse(JSON.stringify(item))
                : { school: '', degree: '', period: '', location: '', field: '', logo: '' };
        },
        save: (data, s) => store.saveEducation((s as any).item, data),
    },
    contact: {
        title: 'Modifier les coordonnées',
        init: () => {
            const p = store.profile;
            return {
                email: p.email,
                phone: p.phone,
                linkedin: p.linkedin,
                website: p.website,
                address: { ...p.address },
            };
        },
        save: (data) => store.updateContact(data),
    },
};

const sidebarTitle = computed(() => {
    const s = editSidebar.state.section;
    if (!s) return '';
    const { title } = sectionHandlers[s.type];
    return typeof title === 'function' ? title(s) : title;
});

const openEdit = (section: EditSection) => {
    formData.value = sectionHandlers[section.type].init(section);
    editSidebar.open(section);
};

const handleSidebarSave = () => {
    const s = editSidebar.state.section;
    if (!s) return;
    sectionHandlers[s.type].save(formData.value, s);
    editSidebar.close();
};

type DeleteTarget = { item: any; type: 'experience' | 'education' };
const selectedItem = ref<DeleteTarget | null>(null);

const handleDelete = (item: any, type: 'experience' | 'education') => {
    selectedItem.value = { item, type };
    dialog.open();
};

const confirmDelete = () => {
    if (!selectedItem.value) {
        return;
    }
    if (selectedItem.value.type === 'experience') {
        store.deleteExperience(selectedItem.value.item);
    } else {
        store.deleteEducation(selectedItem.value.item);
    }
    dialog.close();
};
</script>

<template>
    <div class="max-w-7xl mx-auto px-6 py-10 space-y-10">

        <ProfileHeader @edit="openEdit({ type: 'header' })" />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <div class="lg:col-span-2 space-y-10">
                <ProfileAbout @edit="openEdit({ type: 'about' })" />
                <ProfileSkills @edit="openEdit({ type: 'skills' })" />
                <ProfileExperience
                    @create="openEdit({ type: 'experience', item: null })"
                    @delete="(item) => handleDelete(item, 'experience')"
                    @edit="(item) => openEdit({ type: 'experience', item })"
                />
                <ProfileEducation
                    @create="openEdit({ type: 'education', item: null })"
                    @delete="(item) => handleDelete(item, 'education')"
                    @edit="(item) => openEdit({ type: 'education', item })"
                />
            </div>

            <div class="space-y-8">
                <ProfileContact @edit="openEdit({ type: 'contact' })" />
            </div>

        </div>

        <!-- Delete dialog -->
        <fsDialog>
            <template #title>
                <h3 class="text-lg font-semibold text-gray-800">Confirmer la suppression</h3>
            </template>

            <div>
                Voulez-vous vraiment supprimer
                <strong>{{ selectedItem?.item?.role || selectedItem?.item?.degree }}</strong> ?
            </div>

            <template #actions>
                <button class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm" @click="dialog.close()">
                    Annuler
                </button>
                <button class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
                        @click="confirmDelete">
                    Supprimer
                </button>
            </template>
        </fsDialog>

        <!-- Edit sidebar -->
        <fsSidebarPanel
            :is-open="editSidebar.state.isOpen"
            :title="sidebarTitle"
            width="max-w-md w-full"
            @close="editSidebar.close()"
        >
            <template v-if="editSidebar.state.section && formData">
                <EditHeaderForm v-if="editSidebar.state.section.type === 'header'" v-model="formData" />
                <EditAboutForm v-else-if="editSidebar.state.section.type === 'about'" v-model="formData" />
                <EditSkillsForm v-else-if="editSidebar.state.section.type === 'skills'" v-model="formData" />
                <EditExperienceForm v-else-if="editSidebar.state.section.type === 'experience'" v-model="formData" />
                <EditEducationForm v-else-if="editSidebar.state.section.type === 'education'" v-model="formData" />
                <EditContactForm v-else-if="editSidebar.state.section.type === 'contact'" v-model="formData" />
            </template>

            <template #footer>
                <div class="flex justify-end gap-3">
                    <button
                        class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition"
                        @click="editSidebar.close()"
                    >
                        Annuler
                    </button>
                    <button
                        class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition shadow-sm"
                        @click="handleSidebarSave"
                    >
                        Enregistrer
                    </button>
                </div>
            </template>
        </fsSidebarPanel>

    </div>
</template>
