import apiClient from '../apiClient';
import { ENDPOINTS } from '../endpoints';

export interface CreateOrderPayload {
    productId: string;
    quantity: number;
    price: number;
    paymentMethod: 'CREDIT_CARD' | 'PAYPAL' | 'APPLE_PAY';
    status: 'PENDING';
}

export interface Order {
    id: string;
    productId: string;
    quantity: number;
    totalPrice: number;
    status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    createdAt: string;
}

export const OrderService = {
    createOrder: async (payload: CreateOrderPayload): Promise<Order> => {
        const response = await apiClient.post<Order>(ENDPOINTS.ORDER.CREATE, payload);
        return response.data;
    },

    getOrders: async (): Promise<Order[]> => {
        const response = await apiClient.get<Order[]>(ENDPOINTS.ORDER.LIST);
        return response.data;
    },

    updateOrderStatus: async (orderId: string, status: Order['status']): Promise<Order> => {
        const url = ENDPOINTS.ORDER.UPDATE_STATUS(orderId);
        const response = await apiClient.patch<Order>(url, { status });
        return response.data;
    },
};
