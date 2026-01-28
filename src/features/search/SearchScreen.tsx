import { useEffect, useState } from 'react';
import { View, TextInput, Text, FlatList } from 'react-native';
import { useDebounce } from '../../hooks/useDebounce';
import { useApi } from '../../hooks/useApi';
import { ProductService } from '../../api/services/product.service';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const { data, loading, request } = useApi(ProductService.searchProducts);

  useEffect(() => {
    request(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      {loading && <Text>Searching...</Text>}

      <FlatList
        data={data || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
