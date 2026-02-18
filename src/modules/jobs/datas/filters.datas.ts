import RemoteFilter from '@/modules/jobs/components/modals/RemoteChoice.component.vue';
import ContractFilter from '@/modules/jobs/components/modals/ContractChoice.component.vue';
import SkillsFilter from '@/modules/jobs/components/modals/SkillsChoice.component.vue';
import EnterpriseFilter from '@/modules/jobs/components/modals/EnterpriseChoice.component.vue';
import SalaryFilter from '@/modules/jobs/components/modals/SalaryRangeSlider.component.vue';
import type { FilterConfig, JobFilters } from '@/core/models/filters.model.ts';

export function useJobFilterConfig(): FilterConfig<JobFilters>[] {
    return [
        { key: 'remote', label: 'Remote', component: RemoteFilter },
        { key: 'contractType', label: 'Contract', component: ContractFilter },
        { key: 'skills', label: 'Skills', component: SkillsFilter },
        { key: 'enterprises', label: 'Enterprise', component: EnterpriseFilter },
        {
            key: 'salary',
            label: 'Salary',
            component: SalaryFilter,
            props: () => ({ max: 120000, min: 20000, step: 1000 }),
        },
    ];
}
