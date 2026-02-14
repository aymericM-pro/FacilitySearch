import { defineStore } from 'pinia';

interface UserState {
    pseudo: string | null;
    token: string | null;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        pseudo: null,
        token: null,
    }),

    actions: {
        setUser(pseudo: string, token: string) {
            this.pseudo = pseudo;
            this.token = token;
        },

        clear() {
            this.pseudo = null;
            this.token = null;
        },
    },
});
