<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import fsBar from '@/core/components/fsBar.component.vue';
import { useProfileStore } from '@/modules/profile/stores/profile.store';

const { t } = useI18n();
const store = useProfileStore();
const emit = defineEmits<{ edit: [] }>();

const fileInput = ref<HTMLInputElement | null>(null);

const availabilityLabel = computed(() =>
    store.profile?.available
        ? t('profile.availability.available')
        : t('profile.availability.unavailable'),
);

const generateCv = async () => {
    await store.generateCv(store.profile!.id);
};

const triggerUpload = () => {
    fileInput.value?.click();
};

const onFileSelected = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || !target.files.length) return;

    const file = target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    await store.uploadProfilePhoto(store.profile!.id, formData);
};
</script>

<template>
    <fsBar
        v-if="store.profile"
        :description="`${store.profile.title} · ${store.profile.location}`"
        :title="store.profile.name"
    >
        <template #logo>
            <div
                class="w-16 h-16 rounded-2xl bg-gray-200 flex items-center justify-center text-white text-2xl font-semibold shadow-md flex-shrink-0 overflow-hidden cursor-pointer"
                @click="triggerUpload"
            >
                <img
                    v-if="store.profile.photoUrl"
                    :src="store.profile.photoUrl"
                    class="w-full h-full object-cover"
                />
                <span v-else class="text-indigo-600">
                    {{ store.profile.name.charAt(0) }}
                </span>
            </div>

            <input
                ref="fileInput"
                accept="image/png, image/jpeg, image/webp"
                class="hidden"
                type="file"
                @change="onFileSelected"
            />
        </template>

        <template #actions>
            <span
                :class="store.profile.available
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'"
                class="px-3 py-1.5 rounded-lg text-sm flex items-center"
            >
                {{ availabilityLabel }}
            </span>

            <button
                class="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium shadow-sm transition"
                @click="generateCv"
            >
                Generate new CV
            </button>

            <button
                class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition flex items-center text-sm"
                @click="emit('edit')"
            >
                <i class="mdi mdi-pencil-outline mr-2"></i>
                {{ t('profile.edit.header') }}
            </button>
        </template>
    </fsBar>
</template>
