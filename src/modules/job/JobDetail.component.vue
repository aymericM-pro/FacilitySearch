<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import fsLink from '@/core/design-system/fsLink.component.vue';
import fsButton from '@/core/design-system/fsButton.component.vue';
import { agorapulseJob } from '@/modules/job/datas/agorapulse.job';

const route = useRoute();
const jobId = route.params.id as string;

const job = agorapulseJob;

const showPdf = ref(false);
const pdfUrl = ref<string | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const generateCv = async () => {
    loading.value = true;
    error.value = null;

    try {
        const { data } = await axios.post(
            'http://localhost:8080/api/curriculum/trigger',
            {
                jobTitle: job.title,
                company: job.company,
            },
        );

        pdfUrl.value = data.url;
        showPdf.value = true;
    } catch (e) {
        error.value = 'Generation failed';
    } finally {
        loading.value = false;
    }
};

const downloadFromBucket = async () => {
    loading.value = true;

    try {
        const { data } = await axios.get(
            `http://localhost:8080/api/curriculum/download/test`,
        );

        pdfUrl.value = data.url;
        showPdf.value = true;
    } finally {
        loading.value = false;
    }
};
const downloadCv = () => {
    if (!pdfUrl.value) return;
    window.open(pdfUrl.value, '_blank');
};

const closePdf = () => {
    showPdf.value = false;
};
</script>

<template>
    <div class="max-w-6xl mx-auto space-y-10">
        <!-- HEADER -->
        <div class="space-y-6">
            <fsLink to="/jobs">
                ← Back to jobs
            </fsLink>

            <div class="flex items-start justify-between">
                <!-- Left -->
                <div class="flex items-start gap-5">
                    <img
                        :src="job.logo"
                        class="w-16 h-16 rounded-xl border"
                    />

                    <div>
                        <h1 class="text-3xl font-semibold text-slate-800">
                            {{ job.title }}
                        </h1>

                        <p class="text-slate-600 mt-2">
                            {{ job.company }} · {{ job.location }}
                        </p>
                    </div>
                </div>

                <!-- Right Buttons -->
                <div class="flex items-center gap-4 min-w-[320px] justify-end">
                    <fsButton
                        class="bg-slate-100 hover:bg-slate-200 text-slate-800"
                        variant="secondary"
                    >
                        Apply
                    </fsButton>

                    <fsButton
                        :disabled="loading"
                        variant="primary"
                        @click="generateCv"
                    >
                        {{ loading ? 'Generating...' : 'Generate Tailored CV' }}
                    </fsButton>

                    <fsButton
                        v-if="pdfUrl"
                        variant="secondary"
                        @click="downloadCv"
                    >
                        Download
                    </fsButton>

                    <fsButton
                        variant="secondary"
                        @click="downloadFromBucket"
                    >
                        Load from bucket
                    </fsButton>
                </div>
            </div>

            <p
                v-if="error"
                class="text-red-600"
            >
                {{ error }}
            </p>
        </div>

        <!-- DESCRIPTION -->
        <div class="bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
            <div class="text-slate-700 leading-relaxed whitespace-pre-line">
                {{ job.description }}
            </div>
        </div>
    </div>

    <!-- PDF DIALOG -->
    <div
        v-if="showPdf && pdfUrl"
        class="fixed inset-0 z-50 flex items-center justify-center"
    >
        <!-- Overlay -->
        <div
            class="absolute inset-0 bg-black/50"
            @click="closePdf"
        />

        <!-- Modal -->
        <div
            class="relative bg-white w-[90vw] h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col"
        >
            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b">
                <h2 class="font-semibold text-slate-800">
                    CV Preview
                </h2>

                <button
                    class="text-slate-500 hover:text-slate-800"
                    @click="closePdf"
                >
                    ✕
                </button>
            </div>

            <!-- PDF -->
            <iframe
                :src="pdfUrl"
                class="flex-1 w-full"
                title="CV Preview"
            />
        </div>
    </div>
</template>
