import { ref } from 'vue';
import api from '@/core/axios/axios.ts';

const token = ref<string | null>(localStorage.getItem('token'));

const user = ref<{
    name: string;
    email: string;
} | null>(null);

export function useAuth() {

    const login = async (payload: { email: string; password: string }) => {
        const { data } = await api.post('/auth/login', payload);

        token.value = data.accessToken;
        localStorage.setItem('token', data.accessToken);

        user.value = {
            name: 'User',
            email: payload.email,
        };
    };

    const register = async (payload: { email: string; pseudo: string; password: string }) => {
        const { data } = await api.post('/auth/register', payload);

        token.value = data.accessToken;
        localStorage.setItem('token', data.accessToken);

        user.value = {
            name: payload.pseudo,
            email: payload.email,
        };

        return data;
    };

    const logout = () => {
        token.value = null;
        user.value = null;
        localStorage.removeItem('token');
    };

    return {
        token,
        user,
        login,
        register,
        logout,
    };
}
