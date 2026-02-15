// composables/useJobLoader.ts
import { ref } from 'vue';
import axios from 'axios';
import type { Filters } from '@/modules/jobs/models/Filters.model';
import type { JobOfferResponse } from '@/modules/jobs/models/JobOffer.model';

export function useJobLoader() {
    const jobs = ref<JobOfferResponse[]>([]);
    const totalItems = ref(0);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const loadJobs = async (
        filters: Filters,
        page: number,
        size: number,
    ) => {
        loading.value = true;
        error.value = null;

        try {
            const token = localStorage.getItem('token');

            const params: Record<string, any> = {
                page: page - 1,
                size,
                sort: 'createdAt,desc',
            };

            Object.entries(filters).forEach(([key, value]) => {
                if (value === null) return;
                if (Array.isArray(value) && value.length === 0) return;

                if (key === 'salary') {
                    const salary = value as [number, number];
                    params.salaryMin = salary[0];
                    params.salaryMax = salary[1];
                    return;
                }

                params[key] = value;
            });

            const { data } = await axios.get(
                'http://localhost:8080/api/job-offers',
                {
                    params,
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            jobs.value = data.content;
            totalItems.value = data.totalElements;
        } catch {
            error.value = 'Failed to load jobs';
        } finally {
            loading.value = false;
        }
    };

    return { jobs, totalItems, loading, error, loadJobs };
}

