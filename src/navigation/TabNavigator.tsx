import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListScreen from '../features/products/ProductListScreen';
import WishlistScreen from '../features/wishlist/WishlistScreen';
import { ProductsIcon } from '../components/icons/ProductsIcon';
import { HeartIcon } from '../components/icons/HeartIcon';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: '#e0e0e0',
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60,
                },
            }}
        >
            <Tab.Screen
                name="ProductList"
                component={ProductListScreen}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ color }) => <ProductsIcon color={color} />,
                }}
            />
            <Tab.Screen
                name="Wishlist"
                component={WishlistScreen}
                options={{
                    tabBarLabel: 'Wishlist',
                    tabBarIcon: ({ color }) => <HeartIcon stroke={color} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
