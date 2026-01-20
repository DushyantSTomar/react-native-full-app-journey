import { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { Product, ProductListService } from '../../api/services/product.service';
import { useApi } from '../../hooks/useApi';
import ErrorView from '../../components/ErrorView';

const ProductListScreen = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { loading, error, request, retry } = useApi(ProductListService.getProducts); 


  const loadMore = useCallback(async () => {
    if (loading) return;
    if (!hasMore) return;

    const response = await request(page);

    setItems(prev => [...prev, ...response.data]);
    setHasMore(response.hasMore);
    setPage(prev => prev + 1);
  }, [page, hasMore, loading, request]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <View style={{ padding: 16, borderBottomWidth: 1 }}>
        <Text>{item.title}</Text>
      </View>
    ),
    []
  );

  useEffect(() => {
    loadMore();
  }, []);

  if (error) {
    return (
      <ErrorView
        message={error.message}
        loading={loading}
        onRetry={retry}
      />
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
      onEndReached={loadMore}
      onEndReachedThreshold={0.2}
      ListFooterComponent={loading ? <ActivityIndicator /> : null}
    />
  );
};

export default ProductListScreen;
