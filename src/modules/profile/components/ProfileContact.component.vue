<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useProfileStore } from '@/modules/profile/stores/profile.store.ts';
import ProfileSection from './ProfileSection.component.vue';

const { t } = useI18n();
const store = useProfileStore();
const emit = defineEmits<{ edit: [] }>();
</script>

<template>
    <ProfileSection
        :title="t('profile.sections.contact')"
        :action-label="t('common.actions.edit')"
        icon="mdi-account-box-outline"
        class="sticky top-6"
        @action="emit('edit')"
    >
        <!-- Email -->
        <div class="mt-6">
            <h3 class="sub-title">{{ t('profile.contact.email') }}</h3>
            <div class="mt-4 flex items-center gap-3">
                <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>
                <a :href="`mailto:${store.profile.email}`" class="text-indigo-600 font-medium hover:underline">
                    {{ store.profile.email }}
                </a>
                <i class="mdi mdi-star-circle text-yellow-500"></i>
            </div>
        </div>

        <div class="divider"></div>

        <!-- Téléphone -->
        <div>
            <h3 class="sub-title">{{ t('profile.contact.phone') }}</h3>
            <div class="mt-4 flex items-center gap-3">
                <i class="mdi mdi-phone-outline text-gray-400 text-lg"></i>
                <a :href="`tel:${store.profile.phone}`" class="font-medium hover:text-indigo-600 transition">
                    {{ store.profile.phone }}
                </a>
            </div>
            <div class="mt-4 bg-gray-50 border rounded-lg p-4 text-sm text-gray-600 flex gap-3">
                <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                {{ t('profile.contact.phonePrivate') }}
            </div>
        </div>

        <div class="divider"></div>

        <!-- Réseaux -->
        <div>
            <h3 class="sub-title">{{ t('profile.contact.networks') }}</h3>
            <div class="mt-4 space-y-4">
                <div class="flex items-center gap-3">
                    <i class="mdi mdi-linkedin text-gray-400 text-lg"></i>
                    <a :href="`https://${store.profile.linkedin}`" class="hover:text-indigo-600 transition" target="_blank">
                        {{ store.profile.linkedin }}
                    </a>
                </div>
                <div class="flex items-center gap-3">
                    <i class="mdi mdi-web text-gray-400 text-lg"></i>
                    <a :href="`https://${store.profile.website}`" class="hover:text-indigo-600 transition" target="_blank">
                        {{ store.profile.website }}
                    </a>
                </div>
            </div>
        </div>

        <div class="divider"></div>

        <!-- Adresse -->
        <div>
            <h3 class="sub-title">{{ t('profile.contact.address') }}</h3>
            <div class="mt-4 text-sm text-gray-700">
                <div class="flex items-center gap-3">
                    <i class="mdi mdi-map-marker-outline text-gray-400 text-lg"></i>
                    {{ store.profile.address.street }},
                    {{ store.profile.address.city }},
                    {{ store.profile.address.postal }}
                </div>
            </div>
        </div>
    </ProfileSection>
</template>

<style scoped>
.sub-title {
    @apply text-sm font-semibold text-gray-500 uppercase tracking-wide mt-6;
}

.divider {
    @apply border-t border-gray-100 my-6;
}
</style>
