import apiClient from '../apiClient';

export interface Product {
  id: number;
  title: string;
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
