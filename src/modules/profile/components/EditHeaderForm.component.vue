<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import fsInput from '@/core/design-system/fsInput.component.vue';

const { t } = useI18n();

const props = defineProps<{
    modelValue: {
        name: string;
        title: string;
        location: string;
        available: boolean;
    };
}>();

const emit = defineEmits<{
    'update:modelValue': [value: typeof props.modelValue];
}>();

const local = ref(JSON.parse(JSON.stringify(props.modelValue)));

watch(local, (val) => emit('update:modelValue', val), { deep: true });
</script>

<template>
    <div class="space-y-4">
        <fsInput
            v-model="local.name"
            :label="t('profile.form.header.name')"
            :placeholder="t('profile.form.header.namePlaceholder')"
        />
        <fsInput
            v-model="local.title"
            :label="t('profile.form.header.jobTitle')"
            :placeholder="t('profile.form.header.jobTitlePlaceholder')"
        />
        <fsInput
            v-model="local.location"
            :label="t('profile.form.header.location')"
            :placeholder="t('profile.form.header.locationPlaceholder')"
        />

        <div class="flex items-center justify-between py-2">
            <span class="text-sm font-medium text-slate-700">{{ t('profile.form.header.available') }}</span>
            <button
                type="button"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition"
                :class="local.available ? 'bg-indigo-600' : 'bg-gray-300'"
                @click="local.available = !local.available"
            >
                <span
                    class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition"
                    :class="local.available ? 'translate-x-6' : 'translate-x-1'"
                />
            </button>
        </div>
    </div>
</template>
