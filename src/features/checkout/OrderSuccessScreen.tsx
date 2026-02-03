import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { styles } from './successStyles';
const CheckIcon = () => (
    <View style={{ width: 40, height: 40, borderWidth: 3, borderColor: '#4CAF50', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#4CAF50', fontSize: 24, fontWeight: 'bold' }}>✓</Text>
    </View>
);

const OrderSuccessScreen = () => {
    const navigation = useNavigation();
    const orderId = React.useMemo(() => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }, []);

    const handleContinueShopping = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'MainTabs' },
                ],
            })
        );
    };
    useEffect(() => {
        const backAction = () => {
            handleContinueShopping();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'top']}>
            <View style={styles.iconContainer}>
                <Text style={{ fontSize: 50, color: '#4CAF50' }}>✓</Text>
            </View>

            <Text style={styles.successText}>Order Placed Successfully!</Text>
            <Text style={styles.orderIdText}>Order ID: #{orderId}</Text>

            <TouchableOpacity style={styles.button} onPress={handleContinueShopping}>
                <Text style={styles.buttonText}>Continue Shopping</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default OrderSuccessScreen;
