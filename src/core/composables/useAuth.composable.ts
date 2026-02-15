import { ref } from 'vue';
import axios from 'axios';

const token = ref<string | null>(localStorage.getItem('token'));

// Mock user temporaire
const user = ref<{
    name: string;
    email: string;
} | null>(
    token.value
        ? {
            name: 'Mia Lore',
            email: 'mia.lore@example.com',
        }
        : null,
);

export function useAuth() {

    const login = async (payload: { email: string; password: string }) => {
        const { data } = await axios.post(
            'http://localhost:8080/api/auth/login',
            payload,
        );

        token.value = data.token;
        localStorage.setItem('token', data.token);

        // Mock user après login
        user.value = {
            name: 'Mia Lore',
            email: payload.email,
        };
    };

    const register = async (payload: { email: string; pseudo: string; password: string }) => {
        const { data } = await axios.post(
            'http://localhost:8080/api/auth/register',
            payload,
        );

        token.value = data.token;
        localStorage.setItem('token', data.token);

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
