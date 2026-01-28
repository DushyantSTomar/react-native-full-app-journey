import { useEffect, useState, useCallback, useRef } from 'react';
import { View, FlatList, Text, ActivityIndicator, Image } from 'react-native';
import { Product, ProductService } from '../../api/services/product.service';
import { useApi } from '../../hooks/useApi';
import ErrorView from '../../components/ErrorView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, COLUMN_COUNT } from './styles';

const ProductListScreen = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const isListEndRef = useRef(false);

  const { loading, error, request, retry } = useApi(ProductService.getProducts);

  const loadInitial = useCallback(async () => {
    try {
      setPage(1);
      setHasMore(true);
      isListEndRef.current = false;
      setItems([]);

      const response = await request(1);
      setItems(response.data);
      setHasMore(response.hasMore);
      if (response.hasMore) {
        setPage(2);
      }
    } catch (e) {
    }
  }, [request]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
 
    try {
      const response = await request(page);

      setItems(prev => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      if (response.hasMore) {
        setPage(prev => prev + 1);
      }
    } catch (e) {   
    }
  }, [loading, hasMore, page, request]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  const handleRetry = () => {
    loadInitial();
  };

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ProductItem item={item} />,
    []
  );

  const renderFooter = () => {
    if (loading && items.length > 0) {
      return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }
    return null;
  };

  if (loading && items.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error && items.length === 0) {
    return (
      <ErrorView
        message={error.message}
        loading={loading}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        numColumns={COLUMN_COUNT}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const ProductItem = ({ item }: { item: Product }) => {
  const [imageError, setImageError] = useState(false);
  const DUMMY_IMAGE = 'https://placehold.co/300x300.png?text=No+Image';

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('placehold.co') && !url.includes('.png')) {
      return url.replace(/([\d]+x[\d]+)/, '$1.png');
    }
    return url;
  };

  const imageUrl = getImageUrl(item.image_url);

  const imageSource = (imageUrl && !imageError)
    ? { uri: imageUrl }
    : { uri: DUMMY_IMAGE };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="contain"
          onError={() => setImageError(true)}
        />
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2}>
            {item?.title}
          </Text>
          <Text style={styles.price}>${(Number(item.price) || 0).toFixed(2)}</Text>
          <Text style={styles.category}>{item?.category}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductListScreen;
