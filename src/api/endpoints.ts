export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REFRESH: '/auth/refresh',
        LOGOUT: '/auth/logout',
    },
    USER: {
        PROFILE: '/user/profile',
        UPDATE: '/user/update',
    },
    ORDER: {
        CREATE: '/orders',
        LIST: '/orders',
        DETAIL: (orderId: string) => `/orders/${orderId}`,
        UPDATE_STATUS: (orderId: string) => `/orders/${orderId}/status`,
    },
} as const;
