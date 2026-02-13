import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useNavigation } from '@/core/composables/navigation.composable';

const pushMock = vi.fn();

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}));

describe('useNavigation', () => {
    beforeEach(() => {
        pushMock.mockClear();
    });

    it('goTo should push with route name', () => {
        const { goTo } = useNavigation();

        goTo('home' as any);

        expect(pushMock).toHaveBeenCalledWith({ name: 'home' });
    });

    it('goToWithQuery should push with query params', () => {
        const { goToWithQuery } = useNavigation();

        const query = { page: 2, genre: 10 };

        goToWithQuery('home' as any, query);

        expect(pushMock).toHaveBeenCalledWith({
            name: 'home',
            query,
        });
    });

    it('goToWithParams should push with route params', () => {
        const { goToWithParams } = useNavigation();

        const params = { id: 42 };

        goToWithParams('home' as any, params);

        expect(pushMock).toHaveBeenCalledWith({
            name: 'home',
            params,
        });
    });
});
