// useJobFilterConfig.ts

import type { FilterConfig } from '@/modules/jobs/models/Filters.model';
import type { ComputedRef } from 'vue';

import RemoteFilter from '@/modules/jobs/components/modals/RemoteChoice.component.vue';
import ContractFilter from '@/modules/jobs/components/modals/ContractChoice.component.vue';
import SkillsFilter from '@/modules/jobs/components/modals/SkillsChoice.component.vue';
import EnterpriseFilter from '@/modules/jobs/components/modals/EnterpriseChoice.component.vue';
import SalaryFilter from '@/modules/jobs/components/modals/SalaryRangeSlider.component.vue';

export function useJobFilterConfig(
    allSkills: ComputedRef<string[]>,
    allEnterprises: ComputedRef<string[]>,
): FilterConfig[] {
    return [
        { key: 'remote', label: 'Remote', component: RemoteFilter },
        { key: 'contractType', label: 'Contract', component: ContractFilter },
        {
            key: 'skills',
            label: 'Skills',
            component: SkillsFilter,
            props: () => ({ allSkills: allSkills.value }),
        },
        {
            key: 'enterprises',
            label: 'Enterprise',
            component: EnterpriseFilter,
            props: () => ({ allEnterprises: allEnterprises.value }),
        },
        {
            key: 'salary',
            label: 'Salary',
            component: SalaryFilter,
            props: () => ({ max: 120000, min: 20000, step: 1000 }),
        },
    ];
}
