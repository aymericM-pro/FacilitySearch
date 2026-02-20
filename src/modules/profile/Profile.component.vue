<script lang="ts" setup>
import { computed, ref } from 'vue';
import { profile } from '@/modules/profile/datas/profile.data.ts';
import { useDialogService } from '@/core/composables/dialog.composable.ts';
import type { EditSection } from '@/core/composables/editSidebar.composable.ts';
import { useEditSidebarService } from '@/core/composables/editSidebar.composable.ts';
import fsDialog from '@/core/components/fsDialog.component.vue';
import fsEditSidebar from '@/core/components/fsEditSidebar.component.vue';
import EditHeaderForm from '@/modules/profile/components/EditHeaderForm.component.vue';
import EditAboutForm from '@/modules/profile/components/EditAboutForm.component.vue';
import EditSkillsForm from '@/modules/profile/components/EditSkillsForm.component.vue';
import EditExperienceForm from '@/modules/profile/components/EditExperienceForm.component.vue';
import EditEducationForm from '@/modules/profile/components/EditEducationForm.component.vue';
import EditContactForm from '@/modules/profile/components/EditContactForm.component.vue';

const dialog = useDialogService();
const editSidebar = useEditSidebarService();

const formData = ref<any>(null);

const availabilityLabel = computed(() =>
    profile.available ? 'Open to work' : 'Indisponible',
);

const sidebarTitle = computed(() => {
    const s = editSidebar.state.section;
    if (!s) return '';
    const map: Record<string, string> = {
        header: 'Modifier le profil',
        about: 'Modifier le résumé',
        skills: 'Modifier les compétences',
        contact: 'Modifier les coordonnées',
    };
    if (s.type === 'experience') return s.item ? `Modifier – ${s.item.company}` : 'Nouvelle expérience';
    if (s.type === 'education') return s.item ? `Modifier – ${s.item.school}` : 'Nouvelle formation';
    return map[s.type] ?? '';
});

const openEdit = (section: EditSection) => {
    if (section.type === 'header') {
        formData.value = {
            name: profile.name,
            title: profile.title,
            location: profile.location,
            available: profile.available,
        };
    } else if (section.type === 'about') {
        formData.value = { about: profile.about };
    } else if (section.type === 'skills') {
        formData.value = { skills: [...profile.skills] };
    } else if (section.type === 'experience') {
        formData.value = section.item
            ? JSON.parse(JSON.stringify(section.item))
            : { company: '', role: '', period: '', location: '', logo: '' };
    } else if (section.type === 'education') {
        formData.value = section.item
            ? JSON.parse(JSON.stringify(section.item))
            : { school: '', degree: '', period: '', location: '', field: '', logo: '' };
    } else if (section.type === 'contact') {
        formData.value = {
            email: profile.email,
            phone: profile.phone,
            linkedin: profile.linkedin,
            website: profile.website,
            address: { ...profile.address },
        };
    }
    editSidebar.open(section);
};

const handleSidebarSave = () => {
    const s = editSidebar.state.section;
    if (!s) return;

    if (s.type === 'header') {
        profile.name = formData.value.name;
        profile.title = formData.value.title;
        profile.location = formData.value.location;
        profile.available = formData.value.available;
    } else if (s.type === 'about') {
        profile.about = formData.value.about;
    } else if (s.type === 'skills') {
        profile.skills.splice(0, profile.skills.length, ...formData.value.skills);
    } else if (s.type === 'experience') {
        if (s.item) {
            const index = profile.experiences.findIndex((e) => e === s.item);
            if (index !== -1) {
                const exp = profile.experiences[index];
                exp.company = formData.value.company;
                exp.role = formData.value.role;
                exp.period = formData.value.period;
                exp.location = formData.value.location;
                exp.logo = formData.value.logo;
            }
        } else {
            profile.experiences.push(formData.value);
        }
    } else if (s.type ===
        'education') {
        if (s.item) {
            const index = profile.educations.findIndex((e) => e === s.item);
            if (index !== -1) {
                const edu = profile.educations[index];
                edu.school = formData.value.school;
                edu.degree = formData.value.degree;
                edu.period = formData.value.period;
                edu.location = formData.value.location;
                edu.field = formData.value.field;
                edu.logo = formData.value.logo;
            }
        } else {
            profile.educations.push(formData.value);
        }
    } else if (s.type === 'contact') {
        profile.email = formData.value.email;
        profile.phone = formData.value.phone;
        profile.linkedin = formData.value.linkedin;
        profile.website = formData.value.website;
        Object.assign(profile.address, formData.value.address);
    }

    editSidebar.close();
};

const handleEdit = (item: any, type: 'experience' | 'education') => {
    if (type === 'experience') {
        openEdit({ type: 'experience', item });
    } else {
        openEdit({ type: 'education', item });
    }
};

const selectedItem = ref<any | null>(null);

const handleDelete = (item: any) => {
    selectedItem.value = item;
    dialog.open();
};

const confirmDelete = () => {
    console.log('Delete confirmed', selectedItem.value);
    dialog.close();
};
</script>

<template>
    <div class="max-w-7xl mx-auto px-6 py-10 space-y-10">

        <!-- HEADER -->
        <section class="card flex justify-between items-center">
            <div class="flex items-center gap-6">
                <div
                    class="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold shadow-md"
                >
                    {{ profile.name.charAt(0) }}
                </div>

                <div>
                    <h1 class="text-2xl font-semibold">{{ profile.name }}</h1>
                    <p class="text-gray-500">{{ profile.title }}</p>

                    <div class="flex gap-3 mt-3">

            <span class="chip flex items-center gap-2">
              <i class="mdi mdi-map-marker-outline"></i>
              {{ profile.location }}
            </span>

                        <span class="chip bg-green-100 text-green-700">
              {{ availabilityLabel }}
            </span>

                    </div>
                </div>
            </div>

            <button class="btn-primary" @click="openEdit({ type: 'header' })">
                <i class="mdi mdi-pencil-outline mr-2"></i>
                Modifier le profil
            </button>
        </section>

        <!-- GRID -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <!-- LEFT -->
            <div class="lg:col-span-2 space-y-10">

                <section class="card space-y-6">

                    <div class="flex justify-between items-center">
                        <h2 class="section-title flex items-center gap-2">
                            <i class="mdi mdi-text-box-outline text-lg"></i>
                            À propos
                        </h2>

                        <button
                            class="text-indigo-600 hover:underline text-sm font-medium"
                            @click="openEdit({ type: 'about' })"
                        >
                            Modifier
                        </button>
                    </div>

                    <div class="space-y-5 text-gray-700 leading-relaxed">

                        <div>
                            <strong>Résumé du profil :</strong>
                            <p class="mt-2">
                                {{ profile.about }}
                            </p>
                        </div>

                    </div>

                </section>

                <!-- SKILLS -->
                <section class="card">
                    <div class="flex justify-between items-center">
                        <h2 class="section-title">Compétences</h2>
                        <button
                            class="text-indigo-600 hover:underline text-sm font-medium"
                            @click="openEdit({ type: 'skills' })"
                        >
                            Modifier
                        </button>
                    </div>

                    <div class="flex flex-wrap gap-3 mt-6">
            <span
                v-for="skill in profile.skills"
                :key="skill"
                class="chip"
            >
              {{ skill }}
            </span>
                    </div>
                </section>

                <!-- EXPERIENCE -->
                <section class="card">
                    <div class="flex justify-between items-center">
                        <h2 class="section-title flex items-center gap-2">
                            <i class="mdi mdi-briefcase-outline text-lg"></i>
                            Expérience
                        </h2>

                        <button
                            class="text-indigo-600 hover:underline text-sm font-medium"
                            @click="openEdit({ type: 'experience', item: null })"
                        >
                            Créer
                        </button>
                    </div>

                    <div class="mt-8">

                        <div
                            v-for="(exp, index) in profile.experiences"
                            :key="exp.company"
                        >

                            <div class="flex items-start gap-5 py-6 hover:bg-gray-50 transition rounded-lg px-2">

                                <!-- LOGO -->
                                <div
                                    class="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center border shadow-sm">
                                    <img
                                        v-if="exp.logo"
                                        :src="exp.logo"
                                        alt="Logo"
                                        class="w-8 h-8 object-contain"
                                    />
                                    <i
                                        v-else
                                        class="mdi mdi-office-building text-gray-400 text-2xl"
                                    ></i>
                                </div>

                                <!-- CONTENT -->
                                <div class="flex-1">

                                    <div class="flex justify-between items-start">

                                        <div>
                                            <h3 class="font-semibold text-gray-800 text-base">
                                                {{ exp.role }}
                                            </h3>

                                            <p class="text-sm text-gray-600 mt-1">
                                                {{ exp.company }}
                                            </p>
                                        </div>

                                        <!-- ACTIONS -->
                                        <div class="flex items-center gap-4">

                                            <button
                                                class="text-indigo-600 hover:text-indigo-800 transition"
                                                @click="handleEdit(exp, 'experience')"
                                            >
                                                <i class="mdi mdi-pencil-outline text-lg"></i>
                                            </button>

                                            <button
                                                class="text-red-600 hover:text-red-800 transition"
                                                @click="handleDelete(exp)"
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

                            <!-- SEPARATOR -->
                            <div
                                v-if="index !== profile.experiences.length - 1"
                                class="border-t border-gray-200"
                            ></div>

                        </div>

                    </div>
                </section>

                <!-- EDUCATION -->
                <section class="card">
                    <div class="flex justify-between items-center">
                        <h2 class="section-title flex items-center gap-2">
                            <i class="mdi mdi-school-outline text-lg"></i>
                            Éducation
                        </h2>

                        <button
                            class="text-indigo-600 hover:underline text-sm font-medium"
                            @click="openEdit({ type: 'education', item: null })"
                        >
                            Créer
                        </button>
                    </div>

                    <div class="mt-8">

                        <div
                            v-for="(edu, index) in profile.educations"
                            :key="edu.school + index"
                        >

                            <div class="flex items-start gap-5 py-6 hover:bg-gray-50 transition rounded-lg px-2">

                                <!-- LOGO ECOLE -->
                                <div
                                    class="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center border shadow-sm">
                                    <img
                                        v-if="edu.logo"
                                        :src="edu.logo"
                                        alt="Logo école"
                                        class="w-8 h-8 object-contain"
                                    />
                                    <i
                                        v-else
                                        class="mdi mdi-school text-gray-400 text-2xl"
                                    ></i>
                                </div>

                                <!-- CONTENT -->
                                <div class="flex-1">

                                    <div class="flex justify-between items-start">

                                        <div>
                                            <h3 class="font-semibold text-gray-800 text-base">
                                                {{ edu.degree }}
                                            </h3>

                                            <p class="text-sm text-gray-600 mt-1">
                                                {{ edu.school }}
                                            </p>
                                        </div>

                                        <!-- ACTIONS -->
                                        <div class="flex items-center gap-4">

                                            <button
                                                class="text-indigo-600 hover:text-indigo-800 transition"
                                                @click="handleEdit(edu, 'education')"
                                            >
                                                <i class="mdi mdi-pencil-outline text-lg"></i>
                                            </button>

                                            <button
                                                class="text-red-600 hover:text-red-800 transition"
                                                @click="handleDelete(edu)"
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

                            <!-- SEPARATOR -->
                            <div
                                v-if="index !== profile.educations.length - 1"
                                class="border-t border-gray-200"
                            ></div>

                        </div>

                    </div>
                </section>
            </div>

            <!-- RIGHT -->
            <div class="space-y-8">

                <section class="card sticky top-6">
                    <div class="flex justify-between items-center">
                        <h2 class="section-title flex items-center gap-2">
                            <i class="mdi mdi-account-box-outline text-lg"></i>
                            Contact
                        </h2>

                        <button
                            class="text-indigo-600 hover:underline text-sm font-medium"
                            @click="openEdit({ type: 'contact' })"
                        >
                            Modifier
                        </button>
                    </div>

                    <!-- EMAILS -->
                    <div>
                        <h3 class="sub-title">Adresses email</h3>

                        <div class="mt-4 flex items-center gap-3">
                            <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>

                            <a
                                :href="`mailto:${profile.email}`"
                                class="text-indigo-600 font-medium hover:underline"
                            >
                                {{ profile.email }}
                            </a>

                            <i class="mdi mdi-star-circle text-yellow-500"></i>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <!-- TELEPHONE -->
                    <div>
                        <h3 class="sub-title">Numéro(s) de téléphone</h3>

                        <div class="mt-4 flex items-center gap-3">
                            <i class="mdi mdi-phone-outline text-gray-400 text-lg"></i>

                            <a
                                :href="`tel:${profile.phone}`"
                                class="font-medium hover:text-indigo-600 transition"
                            >
                                {{ profile.phone }}
                            </a>
                        </div>

                        <div class="mt-4 bg-gray-50 border rounded-lg p-4 text-sm text-gray-600 flex gap-3">
                            <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                            Champ privé, visible uniquement par vous et les administrateurs.
                        </div>
                    </div>

                    <div class="divider"></div>

                    <!-- RESEAUX -->
                    <div>
                        <h3 class="sub-title">Réseaux & Site</h3>

                        <div class="mt-4 space-y-4">

                            <div class="flex items-center gap-3">
                                <i class="mdi mdi-linkedin text-gray-400 text-lg"></i>
                                <a
                                    :href="`https://${profile.linkedin}`"
                                    class="hover:text-indigo-600 transition"
                                    target="_blank"
                                >
                                    {{ profile.linkedin }}
                                </a>
                            </div>

                            <div class="flex items-center gap-3">
                                <i class="mdi mdi-web text-gray-400 text-lg"></i>
                                <a
                                    :href="`https://${profile.website}`"
                                    class="hover:text-indigo-600 transition"
                                    target="_blank"
                                >
                                    {{ profile.website }}
                                </a>
                            </div>

                        </div>
                    </div>

                    <div class="divider"></div>

                    <!-- ADRESSE -->
                    <div>
                        <h3 class="sub-title">Adresse(s) postale(s)</h3>

                        <div class="mt-4 space-y-3 text-sm text-gray-700">

                            <div class="flex items-center gap-3">
                                <i class="mdi mdi-map-marker-outline text-gray-400 text-lg"></i>
                                {{ profile.address.street }},
                                {{ profile.address.city }},
                                {{ profile.address.postal }}
                            </div>

                        </div>
                    </div>


                </section>

            </div>

        </div>

        <fsDialog>

            <template #title>
                <h3 class="text-lg font-semibold text-gray-800">
                    Confirmer la suppression
                </h3>
            </template>

            <div>
                Voulez-vous vraiment supprimer
                <strong>
                    {{ selectedItem?.role || selectedItem?.degree }}
                </strong>
                ?
            </div>

            <template #actions>
                <button
                    class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                    @click="dialog.close()"
                >
                    Annuler
                </button>

                <button
                    class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
                    @click="confirmDelete"
                >
                    Supprimer
                </button>
            </template>

        </fsDialog>

        <fsEditSidebar
            :is-open="editSidebar.state.isOpen"
            :title="sidebarTitle"
            @close="editSidebar.close()"
            @save="handleSidebarSave"
        >
            <template v-if="editSidebar.state.section && formData">
                <EditHeaderForm
                    v-if="editSidebar.state.section.type === 'header'"
                    v-model="formData"
                />
                <EditAboutForm
                    v-else-if="editSidebar.state.section.type === 'about'"
                    v-model="formData"
                />
                <EditSkillsForm
                    v-else-if="editSidebar.state.section.type === 'skills'"
                    v-model="formData"
                />
                <EditExperienceForm
                    v-else-if="editSidebar.state.section.type === 'experience'"
                    v-model="formData"
                />
                <EditEducationForm
                    v-else-if="editSidebar.state.section.type === 'education'"
                    v-model="formData"
                />
                <EditContactForm
                    v-else-if="editSidebar.state.section.type === 'contact'"
                    v-model="formData"
                />
            </template>
        </fsEditSidebar>

    </div>
</template>

<style scoped>
.card {
    @apply bg-white rounded-2xl shadow-sm border p-6;
}

.section-title {
    @apply text-lg font-semibold text-gray-800;
}

.chip {
    @apply px-3 py-1.5 rounded-lg text-sm bg-gray-100 text-gray-700 flex items-center;
}

.btn-primary {
    @apply px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition flex items-center;
}
</style>
