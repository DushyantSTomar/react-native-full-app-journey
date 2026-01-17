import apiClient from '../apiClient';
import { ENDPOINTS } from '../endpoints';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface UpdateProfilePayload {
    name?: string;
    phone?: string;
    avatar?: string;
}

export const UserService = {
    getProfile: async (): Promise<UserProfile> => {
        const response = await apiClient.get<UserProfile>(ENDPOINTS.USER.PROFILE);
        return response.data;
    },

    updateProfile: async (payload: UpdateProfilePayload): Promise<UserProfile> => {
        const response = await apiClient.put<UserProfile>(ENDPOINTS.USER.UPDATE, payload);
        return response.data;
    },
};
