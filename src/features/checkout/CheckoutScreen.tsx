import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { Product } from '../../api/services/product.service';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const CheckoutScreen = () => {
    const navigation = useNavigation();
    const cartItems = useSelector((state: RootState) => state.cart.items.filter(item => item.selected));
    const totalAmount = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    const handlePlaceOrder = () => {
        navigation.navigate('Payment' as never);
    };

    const renderItem = ({ item }: { item: Product & { quantity: number } }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>${(Number(item.price) * item.quantity).toFixed(2)}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.placeOrderButton, cartItems.length === 0 && { opacity: 0.5, backgroundColor: '#ccc' }]}
                    onPress={handlePlaceOrder}
                    disabled={cartItems.length === 0}
                >
                    <Text style={styles.placeOrderText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CheckoutScreen;
