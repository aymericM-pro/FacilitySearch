// useCompanyJobOffers.composable.ts
import { ref } from 'vue';
import api from '@/core/axios/axios';

export function useCompanyJobOffers() {
    const jobOffers = ref<any[]>([]);
    const totalItems = ref(0);
    const loading = ref(false);

    const load = async (companyId: string, page = 0, size = 8) => {
        loading.value = true;
        try {
            const res = await api.get(`/companies/${companyId}/job-offers`, {
                params: { page, size },
            });
            jobOffers.value = res.data.content;
            totalItems.value = res.data.totalElements;
        } finally {
            loading.value = false;
        }
    };

    return { jobOffers, totalItems, loading, load };
}
