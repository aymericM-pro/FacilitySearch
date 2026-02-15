import { ref } from 'vue';

export function useJobPagination() {
    const currentPage = ref(1);
    const pageSize = 12;

    return { currentPage, pageSize };
}
