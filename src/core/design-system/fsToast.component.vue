<script lang="ts" setup>
import { useToastStore } from '@/core/stores/useToastStore.store';

const toastStore = useToastStore();
</script>

<template>
    <div class="toast-container">
        <div
            v-for="toast in toastStore.toasts"
            :key="toast.id"
            :class="['toast', toast.type]"
        >
            {{ toast.message }}
        </div>
    </div>
</template>
