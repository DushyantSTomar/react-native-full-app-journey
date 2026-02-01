import React, { useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../store';
import { removeFromCart, increaseQuantity, decreaseQuantity, toggleSelection } from './cartSlice';
import { Product } from '../../api/services/product.service';
import { styles } from './styles';

const CartScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const selectedItems = cartItems.filter(item => item.selected);
    const totalPrice = selectedItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
    const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleIncrease = (id: number) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id: number) => {
        dispatch(decreaseQuantity(id));
    };

    const handleToggle = (id: number) => {
        dispatch(toggleSelection(id));
    };

    const handleCheckout = () => {
        if (selectedItems.length > 0) {
            navigation.navigate('Checkout' as never);
        }
    };

    const renderItem = ({ item }: { item: Product & { quantity: number; selected?: boolean } }) => (
        <View style={styles.cartItem}>
            <TouchableOpacity
                style={{ padding: 8, justifyContent: 'center' }}
                onPress={() => handleToggle(item.id)}
            >
                <View style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: item.selected ? '#007AFF' : '#C5C5C5',
                    backgroundColor: item.selected ? '#007AFF' : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {item.selected && <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>✓</Text>}
                </View>
            </TouchableOpacity>

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
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total Items</Text>
                    <Text style={styles.summaryValue}>{totalItems}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Grand Total</Text>
                    <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
                </View>

                <TouchableOpacity
                    style={[styles.checkoutButton, selectedItems.length === 0 && styles.disabledButton]}
                    disabled={selectedItems.length === 0}
                    onPress={handleCheckout}
                >
                    <Text style={styles.checkoutButtonText}>
                        {selectedItems.length > 0 ? `Checkout (${selectedItems.length})` : 'Select Items'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CartScreen;
