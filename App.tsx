
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from './src/api/apiClient';
import { setupInterceptors } from './src/api/interceptors';
import ProductListScreen from './src/features/products/ProductListScreen';
import { AuthProvider } from './src/auth/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';


const App = () => {
  useEffect(() => {
    setupInterceptors(apiClient);
  }, []);

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>

  );
};

export default App;