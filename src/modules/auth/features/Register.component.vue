<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { registerSchema } from '@/modules/auth/schema/auth.schema';
import { useAuth } from '@/core/composables/useAuth.composable';
import { AppRoute } from '@/router';
import { useNavigation } from '@/core/composables/navigation.composable.ts';
import fsInput from '@/core/design-system/fsInput.component.vue';
import fsButton from '@/core/design-system/fsButton.component.vue';
import { useUserStore } from '@/core/composables/user.store.ts';

const { t } = useI18n();
const { register } = useAuth();
const { goTo } = useNavigation();

const form = reactive({
    email: '',
    pseudo: '',
    password: '',
    confirmPassword: '',
});

const errors = ref<Record<string, string>>({});
const loading = ref(false);
const userStore = useUserStore();

const submit = async () => {
    errors.value = {};

    const result = registerSchema.safeParse(form);

    if (!result.success) {
        result.error.issues.forEach(issue => {
            errors.value[issue.path[0] as string] = issue.message;
        });
        return;
    }

    loading.value = true;

    try {
        const response = await register({
            email: form.email,
            password: form.password,
            pseudo: form.pseudo,
        });

        userStore.setUser(form.pseudo, response.token);

        goTo(AppRoute.JOBS);

    } finally {
        loading.value = false;
    }
};

</script>

<template>
    <div class="max-w-md mx-auto space-y-6">
        <h1 class="text-2xl font-semibold">{{ t('auth.register') }}</h1>

        <fsInput
            v-model="form.email"
            :error="errors.email"
            :label="t('auth.fields.email')"
            :placeholder="t('auth.fields.email')"
        />

        <fsInput
            v-model="form.pseudo"
            :error="errors.pseudo"
            :label="t('auth.fields.pseudo')"
            :placeholder="t('auth.fields.pseudo')"
        />

        <fsInput
            v-model="form.password"
            :error="errors.password"
            :label="t('auth.fields.password')"
            :placeholder="t('auth.fields.password')"
            type="password"
        />

        <fsInput
            v-model="form.confirmPassword"
            :error="errors.confirmPassword"
            :label="t('auth.fields.confirmPassword')"
            :placeholder="t('auth.fields.confirmPassword')"
            type="password"
        />


        <fsButton
            :disabled="loading"
            full
            size="md"
            variant="primary"
            @click="submit"
        >
            {{ loading ? t('auth.actions.loading') : t('auth.actions.register') }}
        </fsButton>
    </div>
</template>
