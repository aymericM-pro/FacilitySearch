import CompanyTypeModal from '@/modules/companies/components/modals/CompanyTypeModal.vue';
import IndustryModal from '@/modules/companies/components/modals/IndustryModal.component.vue';
import CityModal from '@/modules/companies/components/modals/CityModal.component.vue';
import type { CompanyFilters, FilterConfig } from '@/core/models/filters.model.ts';

export function useCompanyFilterConfig(): FilterConfig<CompanyFilters>[] {
    return [
        { key: 'companyType', label: 'Type', component: CompanyTypeModal },
        { key: 'industry', label: 'Industry', component: IndustryModal },
        { key: 'city', label: 'City', component: CityModal },
    ];
}
