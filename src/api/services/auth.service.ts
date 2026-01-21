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
type LoginResponse = {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
};

export const AuthService = {
    login: async (
        email: string,
        password: string
    ): Promise<LoginResponse> => {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        if (email === 'test@test.com' && password === '123456') {
            return {
                token: 'fake-jwt-token-123',
                user: {
                    id: 1,
                    name: 'Test User',
                    email,
                },
            };
        }

        throw new Error('Invalid email or password');
    },

    refreshToken: async (token: string): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.REFRESH, { refreshToken: token });
        return response.data;
    },

    logout: async (): Promise<void> => {
        await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    },
};

