import apiClient from '../apiClient';
import { Product } from './product.service';

export interface AISearchResponse {
    data: Product[];
    message: string;
}

export const AIService = {
    searchProducts: async (query: string): Promise<Product[]> => {
      try {
        const response = await apiClient.post<Product[]>('/ai/search', { query });
        return response.data;
      } catch {
        return [];
      }
    },
  };