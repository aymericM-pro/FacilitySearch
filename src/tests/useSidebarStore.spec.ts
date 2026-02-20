import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useSidebarStore } from '@/core/stores/useSidebarStore.store';

describe('useSidebarStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('should have isOpen false by default', () => {
        const store = useSidebarStore();

        expect(store.isOpen).toBe(false);
    });

    it('should open sidebar when toggle is called and sidebar is closed', () => {
        const store = useSidebarStore();

        store.toggle();

        expect(store.isOpen).toBe(true);
    });

    it('should close sidebar when toggle is called and sidebar is open', () => {
        const store = useSidebarStore();
        store.toggle();

        store.toggle();

        expect(store.isOpen).toBe(false);
    });

    it('should close sidebar when close is called and sidebar is open', () => {
        const store = useSidebarStore();
        store.toggle();

        store.close();

        expect(store.isOpen).toBe(false);
    });

    it('should keep sidebar closed when close is called and sidebar is already closed', () => {
        const store = useSidebarStore();

        store.close();

        expect(store.isOpen).toBe(false);
    });
});
