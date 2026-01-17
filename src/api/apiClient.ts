import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiClient;
