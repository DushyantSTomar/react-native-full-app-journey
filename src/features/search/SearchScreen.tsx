import { useEffect, useState } from 'react';
import { View, TextInput, Text, FlatList } from 'react-native';
import { useDebounce } from '../../hooks/useDebounce';
import { useApi } from '../../hooks/useApi';
import { ProductService } from '../../api/services/product.service';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const { data, loading, request } = useApi(ProductService.searchProducts);

  useEffect(() => {
    request(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Search products..."
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      {loading && <Text>Searching...</Text>}

      <FlatList
        data={data || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default SearchScreen;
