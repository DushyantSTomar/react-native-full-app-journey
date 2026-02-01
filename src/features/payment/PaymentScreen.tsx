import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearCart } from '../cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState('upi');
    const [isProcessing, setIsProcessing] = useState(false);

    const paymentMethods = [
        { id: 'upi', label: 'UPI' },
        { id: 'card', label: 'Credit / Debit Card' },
        { id: 'cod', label: 'Cash on Delivery' },
    ];

    const handlePay = () => {
        if (isProcessing) return;
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            dispatch(clearCart());
            setIsProcessing(false);
            navigation.reset({
                index: 0,
                routes: [{ name: 'OrderSuccess' as never }],
            });
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <View style={styles.content}>
                <Text style={styles.title}>Select Payment Method</Text>

                {paymentMethods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.optionContainer,
                            selectedMethod === method.id && styles.selectedOption,
                            isProcessing && { opacity: 0.5 }
                        ]}
                        onPress={() => !isProcessing && setSelectedMethod(method.id)}
                        activeOpacity={0.7}
                        disabled={isProcessing}
                    >
                        <View style={[
                            styles.radio,
                            selectedMethod === method.id && styles.selectedRadio
                        ]}>
                            {selectedMethod === method.id && <View style={styles.radioInner} />}
                        </View>
                        <Text style={styles.optionText}>{method.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.payButton, isProcessing && { opacity: 0.7 }]}
                    onPress={handlePay}
                    disabled={isProcessing}
                >
                    <Text style={styles.payButtonText}>
                        {isProcessing ? 'Processing Payment...' : 'Pay Now'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default PaymentScreen;
