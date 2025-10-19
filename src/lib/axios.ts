import axios from 'axios';

const STAGE = import.meta.env.VITE_STAGE;

const API_URL = STAGE === 'production'
    ? import.meta.env.VITE_PUBLIC_API_URL
    : import.meta.env.VITE_API_URL;

    
if (STAGE !== 'production') {
    console.log('🔧 API Configuration:', {
        STAGE,
        API_URL,
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_PUBLIC_API_URL: import.meta.env.VITE_PUBLIC_API_URL
    });
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false, // permite envío de cookies
});

export default api;

