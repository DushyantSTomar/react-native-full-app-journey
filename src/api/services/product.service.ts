import apiClient from '../apiClient';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_active: boolean;
  created_at: string;
}

export interface ProductResponse {
  data: Product[];
  page: number;
  hasMore: boolean;
}

export const ProductService = {
  getProducts: async (page: number = 1, limit: number = 10): Promise<ProductResponse> => {
    const response = await apiClient.get<ProductResponse>('/products', {
      params: { page, limit },
    });
    return response.data;
  },
};