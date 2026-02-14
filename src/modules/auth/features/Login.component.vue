<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { loginSchema } from '@/modules/auth/schema/auth.schema';
import { useAuth } from '@/core/composables/useAuth.composable';
import { useNavigation } from '@/core/composables/navigation.composable';
import { AppRoute } from '@/router';
import fsInput from '@/core/design-system/fsInput.component.vue';
import fsButton from '@/core/design-system/fsButton.component.vue';

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
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="max-w-md mx-auto space-y-6">
        <h1 class="text-2xl font-semibold">Login</h1>

        <fsInput
            v-model="form.email"
            :error="errors.email"
            label="Email"
            placeholder="Email"
        />

        <fsInput
            v-model="form.password"
            :error="errors.password"
            label="Password"
            placeholder="Password"
            type="password"
        />

        <fsButton
            :disabled="loading"
            full
            size="md"
            variant="primary"
            @click="submit"
        >
            {{ loading ? 'Loading...' : 'Login' }}
        </fsButton>
    </div>
</template>
