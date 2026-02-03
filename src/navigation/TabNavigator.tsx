import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import HomeScreen from '../features/home/HomeScreen';
import ProductListScreen from '../features/products/ProductListScreen';
import WishlistScreen from '../features/wishlist/WishlistScreen';
import CartScreen from '../features/cart/CartScreen';
import ProductDetailScreen from '../features/products/ProductDetailScreen';
import { HomeIcon } from '../components/icons/HomeIcon';
import { HeartIcon } from '../components/icons/HeartIcon';
import { CartIcon } from '../components/icons/CartIcon';
import AIAssistScreen from '../features/ai-assist/AIAssistScreen';
import { SparklesIcon } from '../components/icons/SparklesIcon';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const headerOptions = {
    headerStyle: {
        backgroundColor: '#fff',
    },
    headerTitleStyle: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: '#000',
    },
    headerShadowVisible: false,
    headerBackTitleVisible: true,
    headerBackTitle: '',
    headerTitleAlign: 'center' as const,
    headerTintColor: '#000',
    animation: 'slide_from_right' as const,
};

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={headerOptions}>
            <Stack.Screen
                name="HomeMain"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProductList"
                component={ProductListScreen}
                options={{ headerTitle: 'Products' }}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{ headerTitle: 'Product Details' }}
            />
        </Stack.Navigator>
    );
};

const TabNavigator = () => {
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const wishlistCount = wishlistItems.length;
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <Tab.Navigator
            backBehavior="history"
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#fff',
                    borderBottomWidth: 1,
                    borderBottomColor: '#f2f2f2',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: '600' as const,
                    color: '#000',
                },
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
                name="Home"
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                }}
            />
            <Tab.Screen
                name="Wishlist"
                component={WishlistScreen}
                options={{
                    tabBarLabel: 'Wishlist',
                    headerTitle: 'My Wishlist',
                    tabBarIcon: ({ color }) => <HeartIcon stroke={color} color={color} />,
                    tabBarBadge: wishlistCount > 0 ? wishlistCount : undefined,
                }}
            />
            <Tab.Screen
                name="AIAssist"
                component={AIAssistScreen}
                options={{
                    tabBarLabel: 'AI Assist',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <SparklesIcon color={color} />,
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarLabel: 'Cart',
                    headerTitle: 'Shopping Cart',
                    tabBarIcon: ({ color }) => <CartIcon color={color} />,
                    tabBarBadge: cartCount > 0 ? cartCount : undefined,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
