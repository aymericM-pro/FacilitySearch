import { reactive } from 'vue';
import type { Filters } from '@/modules/jobs/models/Filters.model.ts';

export function useJobFilters() {
    const filters = reactive<Filters>({
        remote: null,
        contractType: null,
        skills: [],
        enterprises: [],
        salary: null,
    });

    return { filters };
}
