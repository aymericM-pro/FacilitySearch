import { ref } from 'vue';
import type { Company } from '@/modules/companies/models/Company.model';
import api from '@/core/axios/axios.ts';

export function useCompanies() {
    const companies = ref<Company[]>([]);
    const totalItems = ref(0);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function loadCompanies(page: number, size: number) {
        try {
            loading.value = true;
            error.value = null;

            const { data } = await api.get('/companies', {
                params: {
                    page: page - 1,
                    size,
                },
            });

            companies.value = data.content;
            totalItems.value = data.totalElements;

        } catch (err: any) {
            error.value = err?.message ?? 'Failed to load companies';
        } finally {
            loading.value = false;
        }
    }


    return {
        companies,
        totalItems,
        loading,
        error,
        loadCompanies,
    };
}
