import { reactive } from 'vue';

export interface CompanyFilters {
    industry: string[];
    companyType: string[];
    city: string | null;
    createdAfter?: string | null;
}

export function useCompanyFilters() {
    const filters = reactive<CompanyFilters>({
        industry: [],
        companyType: [],
        city: null,
        createdAfter: null,
    });

    function clearAll() {
        filters.industry = [];
        filters.companyType = [];
        filters.city = null;
        filters.createdAfter = null;
    }

    return {
        filters,
        clearAll,
    };
}
