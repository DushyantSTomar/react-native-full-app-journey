import React, { useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeFromCart, increaseQuantity, decreaseQuantity } from './cartSlice';
import { Product } from '../../api/services/product.service';
import { styles } from './styles';

const CartScreen = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const totalPrice = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleIncrease = (id: number) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id: number) => {
        dispatch(decreaseQuantity(id));
    };

    const renderItem = ({ item }: { item: Product & { quantity: number } }) => (
        <View style={styles.cartItem}>
            <Image
                source={{ uri: item.image_url?.replace(/([\d]+x[\d]+)/, '$1.png') || 'https://placehold.co/100x100.png' }}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.itemDetails}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.price}>${(Number(item.price) * item.quantity).toFixed(2)}</Text>
                <View style={styles.controls}>
                    <View style={styles.quantityControls}>
                        <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
                        <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    if (cartItems.length === 0) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <Text style={styles.emptyText}>Your cart is empty</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CartScreen;
