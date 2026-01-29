import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import apiClient from './src/api/apiClient';
import { setupInterceptors } from './src/api/interceptors';
import ProductListScreen from './src/features/products/ProductListScreen';
import { AuthProvider } from './src/auth/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/store';

const App = () => {
  useEffect(() => {
    setupInterceptors(apiClient);
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </Provider>
  );
};

export default App;