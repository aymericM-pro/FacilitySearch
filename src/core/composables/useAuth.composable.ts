import { ref } from 'vue';
import axios from 'axios';

const token = ref<string | null>(localStorage.getItem('token'));

export function useAuth() {

    const login = async (payload: { email: string; password: string }) => {
        const { data } = await axios.post(
            'http://localhost:8080/api/auth/login',
            payload,
        );

        token.value = data.token;
        localStorage.setItem('token', data.token);
    };

    const register = async (payload: { email: string; pseudo: string; password: string }) => {
        const { data } = await axios.post(
            'http://localhost:8080/api/auth/register',
            payload,
        );
        
        token.value = data.token;
        localStorage.setItem('token', data.token);

        return data;
    };

    const logout = () => {
        token.value = null;
        localStorage.removeItem('token');
    };

    return {
        token,
        login,
        register,
        logout,
    };
}
