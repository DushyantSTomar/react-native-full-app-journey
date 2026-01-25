import React from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../auth/AuthContext';
import ProductListScreen from '../features/products/ProductListScreen';
import LoginScreen from '../features/auth/LoginScreen';
import SignUpScreen from '../features/auth/SignUpScreen';
import SearchScreen from '../features/search/SearchScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="ProductList" component={ProductListScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
