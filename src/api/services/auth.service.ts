import apiClient from '../apiClient';
import { ENDPOINTS } from '../endpoints';

export interface LoginPayload {
    email: string;
    password: string;
    deviceId: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const AuthService = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, payload);
        return response.data;
    },

    refreshToken: async (token: string): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.REFRESH, { refreshToken: token });
        return response.data;
    },

    logout: async (): Promise<void> => {
        await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    },
};
