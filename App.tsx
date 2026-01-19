
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from './src/api/apiClient';
import { setupInterceptors } from './src/api/interceptors';
import ProductListScreen from './src/features/products/ProductListScreen';


const App = () => {
  useEffect(() => {
    setupInterceptors(apiClient);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>Custom Hooks Implemented 🚀</Text> */}
      <ProductListScreen />
    </SafeAreaView>
  );
};

export default App;