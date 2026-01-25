import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { triggerLogout } from '../auth/AuthContext';

export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  );

  axiosInstance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        triggerLogout();
      }
      return Promise.reject(error);
    }
  );
};
