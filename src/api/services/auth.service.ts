import apiClient from '../apiClient';
import { ENDPOINTS } from '../endpoints';

export interface LoginPayload {
    email: string;
    password: string;
  }
type LoginResponse = {
    access_token: string;
};
export interface SingUpPayload {
    email: string;
    password: string;
  }


export const AuthService = {
    login: async (payload: LoginPayload): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>(
            '/auth/login',
            payload
        );
        return response.data;
    },
    singup: async (payload: SingUpPayload): Promise<SingUpPayload> => {
        const response = await apiClient.post<SingUpPayload>(
            '/auth/signup',
            payload
        );
        return response.data;
    },

    logout: async (): Promise<void> => {
        await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    },
};

