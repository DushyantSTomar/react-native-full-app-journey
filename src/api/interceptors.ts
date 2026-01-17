import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
    axiosInstance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            const token = await AsyncStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error: unknown) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            if (error.response) {
                const { status } = error.response;
                if (status === 401 || status === 403) {
                    // Handle unauthorized or forbidden errors
                    // In a real app, you might trigger a logout or token refresh here
                }
            }
            return Promise.reject(error);
        }
    );
};
