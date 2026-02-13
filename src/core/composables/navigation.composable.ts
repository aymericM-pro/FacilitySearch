import { useRouter } from 'vue-router'
import type { AppRouteName } from '@/router'

export type MovieQueryParams = {
    provider?: number
    studio?: number
    genre?: number
    query?: string
    page?: number
}

export function useNavigation() {
    const router = useRouter()

    const goTo = (route: AppRouteName) => {
        void router.push({ name: route })
    }

    const goToWithQuery = (
        route: AppRouteName,
        query: MovieQueryParams
    ) => {
        void router.push({ name: route, query })
    }

    const goToWithParams = (
        route: AppRouteName,
        params: Record<string, string | number>
    ) => {
        void router.push({ name: route, params })
    }

    return {
        goTo,
        goToWithQuery,
        goToWithParams,
    }
}
