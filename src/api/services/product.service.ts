import apiClient from '../apiClient';

export interface Product {
  id: number;
  title: string;
}
export interface ProductResponse {
  data: Product[];
  page: number;
  hasMore: boolean;
}

export const ProductService = {
  searchProducts: async (query: string): Promise<Product[]> => {
    if (!query) return [];

    const response = await apiClient.get<Product[]>(
      `https://jsonplaceholder.typicode.com/posts`
    );

    return response.data.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  },
};

export const ProductListService = {
  getProducts: async (page: number): Promise<ProductResponse> => {
    const limit = 10;
    const response = await apiClient.get<Product[]>(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
      // `https://invalid-api-url.example.com`
    );

    return {
      data: response.data,
      page,
      hasMore: response.data.length === limit,
    };
  },
};