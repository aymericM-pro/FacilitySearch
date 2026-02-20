<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import fsBar from '@/core/components/fsBar.component.vue';
import { useProfileStore } from '@/modules/profile/stores/profile.store';

const { t } = useI18n();
const store = useProfileStore();
const emit = defineEmits<{ edit: [] }>();

const availabilityLabel = computed(() =>
    store.profile?.available
        ? t('profile.availability.available')
        : t('profile.availability.unavailable'),
);
</script>

<template>
    <fsBar
        v-if="store.profile"
        :description="`${store.profile.title} · ${store.profile.location}`"
        :title="store.profile.name"
    >
        <template #logo>
            <div
                class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold shadow-md flex-shrink-0"
            >
                {{ store.profile.name.charAt(0) }}
            </div>
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
                class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition flex items-center text-sm"
                @click="emit('edit')"
            >
                <i class="mdi mdi-pencil-outline mr-2"></i>
                {{ t('profile.edit.header') }}
            </button>
        </template>
    </fsBar>
</template>
