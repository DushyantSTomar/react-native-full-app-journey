
import { useAuth } from '../auth/AuthContext';
import { ActivityIndicator } from 'react-native';
import ProductListScreen from '../features/products/ProductListScreen';
import LoginScreen from '../features/auth/LoginScreen';

const RootNavigator = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  return isLoggedIn ? <ProductListScreen /> : <LoginScreen />;
};

export default RootNavigator;
