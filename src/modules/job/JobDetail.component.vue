<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import fsBar from '@/core/components/fsBar.component.vue';
import fsButton from '@/core/design-system/fsButton.component.vue';
import { agorapulseJob } from '@/modules/job/datas/agorapulse.job';

const job = agorapulseJob;

const { t } = useI18n();
const loading = ref(false);
const generating = ref(false);
const error = ref<string | null>(null);

const showSidebar = ref(false);
const showModal = ref(false);

const cvs = ref<any[]>([]);

const token = localStorage.getItem('token');

const loadUserCvsForOffer = async () => {
    loading.value = true;
    error.value = null;

    try {
        const { data } = await axios.get(
            'http://localhost:8080/api/curriculum/by-offer',
            {
                params: {
                    jobTitle: job.title,
                    company: job.company,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        cvs.value = data;
        showSidebar.value = true;

    } catch {
        error.value = t('jobs.detail.errors.loadCvs');
    } finally {
        loading.value = false;
    }
};

const generateCv = async () => {
    generating.value = true;
    error.value = null;

    try {
        await axios.post(
            'http://localhost:8080/api/curriculum/trigger',
            {
                jobTitle: job.title,
                company: job.company,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        showModal.value = false;

        // reload cvs automatically
        await loadUserCvsForOffer();

    } catch {
        error.value = t('jobs.detail.errors.generation');
    } finally {
        generating.value = false;
    }
};

const openPdf = (url: string) => {
    window.open(url, '_blank');
};

const closeSidebar = () => {
    showSidebar.value = false;
};
</script>
<template>
    <div class="max-w-6xl mx-auto space-y-10">

        <!-- HEADER -->
        <fsBar
            :description="`${job.company} · ${job.location}`"
            :logo="job.logo"
            :showBack="true"
            :title="job.title"
            backTo="/jobs"
        >
            <template #actions>
                <div class="flex gap-3">
                    <fsButton
                        variant="secondary"
                        @click="showModal = true"
                    >
                        {{ t('jobs.detail.generateCv') }}
                    </fsButton>

                    <fsButton
                        :disabled="loading"
                        variant="primary"
                        @click="loadUserCvsForOffer"
                    >
                        {{ loading ? t('jobs.detail.loading') : t('jobs.detail.viewMyCvs') }}
                    </fsButton>
                </div>
            </template>
        </fsBar>

        <p v-if="error" class="text-red-600">
            {{ error }}
        </p>

        <!-- DESCRIPTION -->
        <div class="bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
            <div class="text-slate-700 leading-relaxed whitespace-pre-line">
                {{ job.description }}
            </div>
        </div>

    </div>

    <!-- ==============================
          MODAL GENERATE CV
    =============================== -->
    <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center"
    >
        <div
            class="absolute inset-0 bg-black/40"
            @click="showModal = false"
        />

        <div class="relative bg-white w-[420px] rounded-2xl shadow-xl p-8 space-y-6">

            <h2 class="text-lg font-semibold">
                {{ t('jobs.detail.modal.title') }}
            </h2>

            <p class="text-sm text-slate-600">
                {{ t('jobs.detail.modal.description') }}
                <br />
                <strong>{{ job.title }}</strong> at <strong>{{ job.company }}</strong>
            </p>

            <div class="flex justify-end gap-3">
                <fsButton
                    variant="secondary"
                    @click="showModal = false"
                >
                    {{ t('jobs.detail.modal.cancel') }}
                </fsButton>

                <fsButton
                    :disabled="generating"
                    variant="primary"
                    @click="generateCv"
                >
                    {{ generating ? t('jobs.detail.modal.generating') : t('jobs.detail.modal.generate') }}
                </fsButton>
            </div>
        </div>
    </div>

    <!-- ==============================
          SIDEBAR CVS
    =============================== -->
    <div class="fixed inset-0 z-40 pointer-events-none">

        <div
            v-if="showSidebar"
            class="absolute inset-0 bg-black/40 pointer-events-auto"
            @click="closeSidebar"
        />

        <div
            :class="showSidebar ? 'translate-x-0' : 'translate-x-full'"
            class="absolute right-0 top-0 h-full w-[420px] bg-white shadow-2xl border-l
             transform transition-transform duration-300 ease-in-out pointer-events-auto"
        >
            <div class="p-6 border-b flex justify-between items-center">
                <h2 class="text-lg font-semibold">
                    {{ t('jobs.detail.sidebar.title') }}
                </h2>

                <button
                    class="text-slate-500 hover:text-slate-800"
                    @click="closeSidebar"
                >
                    ✕
                </button>
            </div>

            <div class="flex-1 overflow-y-auto p-6 space-y-4">

                <div v-if="!cvs.length" class="text-slate-500">
                    {{ t('jobs.detail.sidebar.empty') }}
                </div>

                <div
                    v-for="cv in cvs"
                    :key="cv.id"
                    class="p-4 border rounded-xl flex justify-between items-center"
                >
                    <div>
                        <p class="text-sm font-medium text-slate-800">
                            {{ cv.createdAt }}
                        </p>
                    </div>

                    <fsButton
                        size="sm"
                        variant="secondary"
                        @click="openPdf(cv.url)"
                    >
                        {{ t('jobs.detail.sidebar.open') }}
                    </fsButton>
                </div>
            </div>
        </div>
    </div>
</template>
