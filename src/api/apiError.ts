import { AxiosError } from 'axios';

export type ApiError = {
    message: string;
    status?: number;
};

export function getApiError(error: unknown): ApiError {
    if (error && typeof error === 'object' && 'isAxiosError' in error) {
        const axiosError = error as AxiosError<any>;

        return {
            message:
                axiosError.response?.data?.message ||
                axiosError.message ||
                'Something went wrong',
            status: axiosError.response?.status,
        };
    }
    if (error instanceof Error) {
        return {
            message: error.message,
        };
    }


    return { message: 'Unexpected error occurred' };
}