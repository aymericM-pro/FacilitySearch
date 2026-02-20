import { reactive } from 'vue';
import type { Experience } from '@/modules/profile/models/experience.model.ts';

export type EditSection =
    | { type: 'header' }
    | { type: 'about' }
    | { type: 'skills' }
    | { type: 'contact' }
    | { type: 'experience'; item: Experience | null }
    | { type: 'education'; item: any | null };

const state = reactive({
    isOpen: false,
    section: null as EditSection | null,
});

export const useEditSidebarService = () => {
    const open = (section: EditSection) => {
        state.section = section;
        state.isOpen = true;
    };

    const close = () => {
        state.isOpen = false;
        setTimeout(() => {
            state.section = null;
        }, 300);
    };

    return {
        state,
        open,
        close,
    };
};
