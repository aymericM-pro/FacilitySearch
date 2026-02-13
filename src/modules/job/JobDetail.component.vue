<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import fsLink from '@/core/design-system/fsLink.component.vue';
import fsButton from '@/core/design-system/fsButton.component.vue';
import { agorapulseJob } from '@/modules/job/datas/agorapulse.job';

const route = useRoute();
const jobId = route.params.id as string;

const job = agorapulseJob;

const pdfUrl = '/templates/base-cv.pdf';

const showPdf = ref(false);

const openPdf = () => {
    showPdf.value = true;
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
                <div class="flex items-center gap-4 min-w-[320px] justify-between">

                    <fsButton
                        class="bg-slate-100 hover:bg-slate-200 text-slate-800"
                        variant="secondary"
                    >
                        Apply
                    </fsButton>

                    <fsButton
                        variant="primary"
                        @click="openPdf"
                    >
                        Generate Tailored CV
                    </fsButton>

                </div>
            </div>
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
        v-if="showPdf"
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

            <!-- Modal Header -->
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
            />

        </div>
    </div>
</template>
