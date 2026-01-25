import axios from 'axios';
import { BASE_URL } from '../config/env';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiClient;
