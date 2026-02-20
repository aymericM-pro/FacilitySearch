<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { loginSchema } from '@/modules/auth/schema/auth.schema';
import { useAuth } from '@/core/composables/useAuth.composable';
import { useNavigation } from '@/core/composables/navigation.composable';
import { AppRoute } from '@/router';
import fsInput from '@/core/design-system/fsInput.component.vue';
import fsButton from '@/core/design-system/fsButton.component.vue';

const { t } = useI18n();
const { login } = useAuth();
const { goTo } = useNavigation();

const form = reactive({
    email: '',
    password: '',
});

const errors = ref<Record<string, string>>({});
const loading = ref(false);

const submit = async () => {
    errors.value = {};

    const result = loginSchema.safeParse(form);

    if (!result.success) {
        result.error.issues.forEach(issue => {
            errors.value[issue.path[0] as string] = issue.message;
        });
        return;
    }

    loading.value = true;

    try {
        await login({
            email: form.email,
            password: form.password,
        });

        goTo(AppRoute.JOBS);

    } catch (e: any) {
        errors.value.global = e.message || t('auth.errors.loginFailed');
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="max-w-md mx-auto space-y-6">
        <h1 class="text-2xl font-semibold">{{ t('auth.login') }}</h1>

        <form class="space-y-6" @submit.prevent="submit">

            <fsInput
                v-model="form.email"
                :error="errors.email"
                :label="t('auth.fields.email')"
                :placeholder="t('auth.fields.email')"
                type="email"
            />

            <fsInput
                v-model="form.password"
                :error="errors.password"
                :label="t('auth.fields.password')"
                :placeholder="t('auth.fields.password')"
                type="password"
            />

            <div
                v-if="errors.global"
                class="text-sm text-red-600"
            >
                {{ errors.global }}
            </div>

            <fsButton
                :disabled="loading"
                full
                size="md"
                type="submit"
                variant="primary"
            >
                {{ loading ? t('auth.actions.loading') : t('auth.actions.login') }}
            </fsButton>

        </form>
    </div>
</template>
