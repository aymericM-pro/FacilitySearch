import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    const isAuthRoute = config.url?.startsWith('/auth');

    if (token && !isAuthRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        const message =
            error.response?.data?.message ??
            error.message ??
            'Unexpected error';

        return Promise.reject(new Error(message));
    },
);

export default api;
