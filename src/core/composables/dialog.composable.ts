// dialog.composable.ts
import { reactive } from 'vue';

const state = reactive({
    isOpen: false,
});

export const useDialogService = () => {
    const open = () => {
        state.isOpen = true;
    };

    const close = () => {
        state.isOpen = false;
    };

    return {
        state,
        open,
        close,
    };
};
