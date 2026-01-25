import { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, } from 'react-native';
import { Product, ProductListService } from '../../api/services/product.service';
import { useApi } from '../../hooks/useApi';
import ErrorView from '../../components/ErrorView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../auth/AuthContext';

const ProductListScreen = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { loading, error, request, retry } = useApi(ProductListService.getProducts);

  const loadInitial = useCallback(async () => {
    const response = await request(1);
    if (response) {
      setItems(response.data);
      setHasMore(response.hasMore);
      setPage(2);
    }
  }, [request]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    const response = await request(page);
    if (response) {
      setItems(prev => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore, page, request]);

  useEffect(() => {
    loadInitial();
  }, []);



  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <View style={{ padding: 16, borderBottomWidth: 1, minHeight: 100, justifyContent: 'center' }}>
        <Text>{item.title}</Text>
      </View>
    ),
    []
  );

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
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        ListFooterComponent={loading && items.length > 0 ? <ActivityIndicator size="large" style={{ margin: 20 }} /> : null}
      />

    </SafeAreaView>
  );
};

export default ProductListScreen;
