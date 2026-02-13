<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import fsButton from '@/core/design-system/fsButton.component.vue';
import fsInput from '@/core/design-system/fsInput.component.vue';

const { t } = useI18n();

const jobTitle = ref('');
const company = ref('');
const loading = ref(false);

const trigger = async () => {
    console.log('Trigger clicked');
    console.log('Payload:', {
        jobTitle: jobTitle.value,
        company: company.value,
    });

    loading.value = true;

    try {
        const res = await fetch('http://localhost:8080/api/curriculum/trigger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobTitle: jobTitle.value,
                company: company.value,
            }),
        });

        console.log('Backend response status:', res.status);

        if (!res.ok) {
            const text = await res.text();
            console.error('Backend error:', text);
        } else {
            console.log('Backend OK');
        }
    } catch (e) {
        console.error('Frontend error:', e);
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="max-w-md mx-auto space-y-4">
        <h1 class="text-2xl font-semibold">
            {{ t('trigger.title') }}
        </h1>

        <fsInput
            v-model="jobTitle"
            :label="t('trigger.fields.jobTitle')"
            :placeholder="t('trigger.placeholders.jobTitle')"
        />

        <fsInput
            v-model="company"
            :label="t('trigger.fields.company')"
            :placeholder="t('trigger.placeholders.company')"
        />

        <fsButton
            :disabled="loading"
            full
            @click="trigger"
        >
            {{ t('common.actions.trigger') }}
        </fsButton>

    </div>
</template>
