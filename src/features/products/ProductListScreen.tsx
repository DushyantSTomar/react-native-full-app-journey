import { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { Product, ProductListService } from '../../api/services/product.service';
import { useApi } from '../../hooks/useApi';

const ProductListScreen = () => {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const { loading, request } = useApi(ProductListService.getProducts, true);

    const loadMore = useCallback(async () => {
        if (loading && page !== 1) return;
        if (!hasMore) return;

        const response = await request(page);

        setItems(prev => [...prev, ...response.data]);
        setHasMore(response.hasMore);
        setPage(prev => prev + 1);
    }, [page, hasMore, loading, request]);

    useEffect(() => {
        loadMore();
    }, []);

    const renderItem = useCallback(
        ({ item, index }: { item: Product, index: number }) => (
            <View 
                style={{ padding: 16, borderBottomWidth: 1 }}>
                <Text>{item.title}</Text>
            </View>
        ),
        []
    );

    return (
        <FlatList
            data={items}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderItem}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}
            ListFooterComponent={loading ? <ActivityIndicator /> : null}
        />
    );
};

export default ProductListScreen;
