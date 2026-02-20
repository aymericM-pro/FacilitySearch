<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { AppRoute } from '@/router';

defineProps<{
    userName: string
    userEmail: string
    userInitials: string
}>();

const emit = defineEmits<{
    (e: 'logout'): void
    (e: 'close'): void
}>();
</script>

<template>
    <div class="-m-6 w-72 rounded-xl overflow-hidden">

        <div class="p-5 flex gap-4 items-center bg-gray-50">
            <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold"
            >
                {{ userInitials }}
            </div>

            <div class="min-w-0">
                <p class="font-semibold text-gray-800">
                    {{ userName }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                    {{ userEmail }}
                </p>
            </div>
        </div>

        <div class="h-px bg-gray-200"></div>

        <RouterLink
            :to="{ name: AppRoute.PROFILE }"
            class="w-full px-5 py-3 flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition"
            @click="emit('close')"
        >
            <i class="mdi mdi-account-outline text-lg"></i>
            Profile
        </RouterLink>

        <div class="h-px bg-gray-200"></div>

        <button
            class="w-full px-5 py-3 text-left flex items-center gap-3 text-red-600 hover:bg-red-50 transition"
            @click="emit('logout')"
        >
            <i class="mdi mdi-logout text-lg"></i>
            Logout
        </button>

    </div>
</template>
