<script lang="ts" setup>
import { ref } from 'vue';
import api from '@/core/axios/axios.ts';

const jobTitle = ref('');
const description = ref('');
const previewText = ref('');

const showModal = ref(false);
const loading = ref(false);
const generating = ref(false);

const generatePreview = async () => {
    if (!jobTitle.value || !description.value) return;

    loading.value = true;

    try {
        const { data } = await api.post(
            '/ai/target-line',
            {
                jobTitle: jobTitle.value,
                description: description.value,
            },
        );

        previewText.value = data.targetLine;
        showModal.value = true;

    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
};

const confirmGeneration = async () => {
    generating.value = true;

    try {
        await api.post(
            '/curriculum/trigger',
            {
                jobTitle: jobTitle.value,
                targetLine: previewText.value,
            },
        );

        showModal.value = false;

    } catch (e) {
        console.error(e);
    } finally {
        generating.value = false;
    }
};
</script>

<template>
    <div class="max-w-2xl mx-auto space-y-6">

        <h1 class="text-2xl font-semibold">
            Déclencher un job CV
        </h1>

        <!-- INPUT TITRE -->
        <div class="space-y-3">
            <label class="block text-base font-semibold text-slate-800">
                Title
            </label>

            <input
                v-model="jobTitle"
                class="w-full p-4 text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Ex: Développeur Java / Vue"
                type="text"
            />
        </div>

        <!-- TEXTAREA DESCRIPTION -->
        <div class="space-y-3">
            <label class="block text-base font-semibold text-slate-800">
                Description
            </label>

            <textarea
                v-model="description"
                class="w-full p-4 text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Paste the full job description here..."
                rows="8"
            />
        </div>


        <!-- BUTTON -->
        <button
            :disabled="loading"
            class="w-full py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            @click="generatePreview"
        >
            {{ loading ? 'Generating...' : 'Generate Preview' }}
        </button>

    </div>

    <!-- MODAL -->
    <div
        v-if="showModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
        <div class="bg-white w-full max-w-xl rounded-2xl p-6 space-y-6">

            <!-- TITLE -->
            <h2 class="text-xl font-semibold">
                Preview CV Target Line
            </h2>

            <!-- CONTENT -->
            <div class="p-4 bg-slate-100 rounded-xl text-sm space-y-2">
                <p class="font-medium">{{ jobTitle }}</p>
                <p>{{ previewText }}</p>
            </div>

            <!-- ACTIONS -->
            <div class="flex justify-end gap-3 pt-4 border-t">
                <button
                    class="px-4 py-2 text-sm text-slate-600 hover:text-slate-800"
                    @click="showModal = false"
                >
                    Cancel
                </button>

                <button
                    :disabled="generating"
                    class="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                    @click="confirmGeneration"
                >
                    {{ generating ? 'Generating CV...' : 'Confirm & Generate CV' }}
                </button>
            </div>

        </div>
    </div>
</template>
