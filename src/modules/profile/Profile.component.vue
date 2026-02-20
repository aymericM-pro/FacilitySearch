<script lang="ts" setup>
import { computed } from 'vue';
import { profile } from '@/modules/profile/datas/profile.data.ts';

const handleEdit = (exp: any) => {
    console.log('edit', exp);
};

const handleDelete = (exp: any) => {
    console.log('delete', exp);
};

const availabilityLabel = computed(() =>
    profile.available ? 'Open to work' : 'Indisponible',
);
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

            <button class="btn-primary">
                <i class="mdi mdi-email-outline mr-2"></i>
                Contacter
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

                        <button class="text-indigo-600 hover:underline text-sm font-medium">
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
                    <h2 class="section-title">Compétences</h2>

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

                        <button class="text-indigo-600 hover:underline text-sm font-medium">
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
                                                @click="handleEdit(exp)"
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

                        <button class="text-indigo-600 hover:underline text-sm font-medium">
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
                                                @click="handleEdit(edu)"
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

                        <button class="text-indigo-600 hover:underline text-sm font-medium">
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
