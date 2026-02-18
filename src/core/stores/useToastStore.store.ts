import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Toast, ToastType } from '@/core/models/toast.model.ts';

export const useToastStore = defineStore('toast', () => {
    const toasts = ref<Toast[]>([]);

    function show(message: string, type: ToastType = 'info', duration = 3000) {
        const id = crypto.randomUUID();

        toasts.value.push({ id, message, type, duration });

        setTimeout(() => remove(id), duration);
    }

    function remove(id: string) {
        toasts.value = toasts.value.filter(t => t.id !== id);
    }

    return { toasts, show, remove };
});
