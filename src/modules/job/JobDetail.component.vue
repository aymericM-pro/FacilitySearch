<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import fsBar from '@/core/components/fsBar.component.vue';
import fsButton from '@/core/design-system/fsButton.component.vue';
import { agorapulseJob } from '@/modules/job/datas/agorapulse.job';

const job = agorapulseJob;

const loading = ref(false);
const error = ref<string | null>(null);
const showSidebar = ref(false);
const cvs = ref<any[]>([]);

const loadUserCvsForOffer = async () => {
    loading.value = true;
    error.value = null;

    try {
        const token = localStorage.getItem('token');

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
        error.value = 'Failed to load CVs';
    } finally {
        loading.value = false;
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

        <!-- HEADER  -->
        <fsBar
            :description="`${job.company} · ${job.location}`"
            :logo="job.logo"
            :showBack="true"
            :title="job.title"
            backTo="/jobs"
        >
            <template #actions>
                <fsButton
                    :disabled="loading"
                    variant="primary"
                    @click="loadUserCvsForOffer"
                >
                    {{ loading ? 'Loading...' : 'View My CVs' }}
                </fsButton>
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

    <!-- SIDEBAR -->
    <div class="fixed inset-0 z-50 pointer-events-none">

        <!-- Overlay -->
        <div
            v-if="showSidebar"
            class="absolute inset-0 bg-black/40 transition-opacity duration-300 pointer-events-auto"
            @click="closeSidebar"
        />

        <!-- Panel -->
        <div
            :class="showSidebar ? 'translate-x-0' : 'translate-x-full'"
            class="absolute right-0 top-0 h-full w-[420px] bg-white shadow-2xl border-l
                   transform transition-transform duration-300 ease-in-out pointer-events-auto"
        >
            <!-- Header -->
            <div class="p-6 border-b flex justify-between items-center">
                <h2 class="text-lg font-semibold">
                    My CVs
                </h2>

                <button
                    class="text-slate-500 hover:text-slate-800"
                    @click="closeSidebar"
                >
                    ✕
                </button>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto p-6 space-y-4">

                <div v-if="!cvs.length" class="text-slate-500">
                    No CV generated yet.
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
                        Open
                    </fsButton>
                </div>
            </div>
        </div>
    </div>
</template>
