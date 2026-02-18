import type { CompanyFilters, FilterConfig } from '@/modules/jobs/models/Filters.model';
import CompanyTypeModal from '@/modules/companies/components/modals/CompanyTypeModal.vue';

export function useCompanyFilterConfig(): FilterConfig<CompanyFilters>[] {
    return [
        {
            key: 'companyType',
            label: 'Company Type',
            component: CompanyTypeModal,
        },
    ];
}
