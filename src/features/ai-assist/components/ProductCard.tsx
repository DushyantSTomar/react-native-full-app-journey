import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../../../api/services/product.service';
import { addToCart } from '../../cart/cartSlice';
import { toggleWishlist } from '../../wishlist/wishlistSlice';
import { RootState } from '../../../store';
import { HeartIcon } from '../../../components/icons/HeartIcon';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const SPACING = 12;
const CARD_WIDTH = (width - (SPACING * (COLUMN_COUNT + 1))) / COLUMN_COUNT;

export const ProductCard = ({ item }: { item: Product }) => {
    const [imageError, setImageError] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const isWishlisted = wishlistItems.some((w) => w.id === item.id);

    const DUMMY_IMAGE = 'https://placehold.co/300x300.png?text=No+Image';

    const getImageUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('placehold.co') && !url.includes('.png')) {
            return url.replace(/([\d]+x[\d]+)/, '$1.png');
        }
        return url;
    };

    const imageUrl = getImageUrl(item.image_url);

    const imageSource = (imageUrl && !imageError)
        ? { uri: imageUrl }
        : { uri: DUMMY_IMAGE };

    const handleToggleWishlist = useCallback(() => {
        if (isProcessing) return;

        setIsProcessing(true);
        dispatch(toggleWishlist(item));

        setTimeout(() => {
            setIsProcessing(false);
        }, 500);
    }, [dispatch, item, isProcessing]);

    const handlePress = () => {
        navigation.navigate('ProductDetail' as never, { product: item } as never);
    };

    const handleAddToCart = () => {
        dispatch(addToCart(item));
    };

    const handleBuyNow = () => {
        dispatch(addToCart(item));
        navigation.navigate('Checkout' as never);
    };

    return (
        <View style={innerStyles.cardContainer}>
            <View style={innerStyles.card}>
                <View style={innerStyles.imageContainer}>
                    <TouchableOpacity
                        onPress={handleToggleWishlist}
                        disabled={isProcessing}
                        activeOpacity={0.7}
                        style={[
                            innerStyles.wishlistButton,
                            { opacity: isProcessing ? 0.7 : 1 }
                        ]}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <HeartIcon filled={isWishlisted} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={imageSource}
                            style={innerStyles.image}
                            resizeMode="contain"
                            onError={() => setImageError(true)}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={{ flex: 1 }}>
                    <View style={innerStyles.details}>
                        <Text style={innerStyles.category} numberOfLines={1}>{item?.category || 'Electronics'}</Text>
                        <Text style={innerStyles.title} numberOfLines={2}>
                            {item?.title}
                        </Text>
                        <View style={innerStyles.priceRow}>
                            <Text style={innerStyles.price}>${(Number(item.price) || 0).toFixed(2)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={innerStyles.actions}>
                    <TouchableOpacity style={innerStyles.addToCartBtn} onPress={handleAddToCart} activeOpacity={0.8}>
                        <Text style={innerStyles.addToCartText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={innerStyles.buyNowBtn} onPress={handleBuyNow} activeOpacity={0.8}>
                        <Text style={innerStyles.buyNowText}>Buy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const innerStyles = StyleSheet.create({
    cardContainer: {
        width: CARD_WIDTH,
        marginBottom: 12,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 10,
        height: 340,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    imageContainer: {
        width: '100%',
        height: 160,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        overflow: 'hidden',
    },
    image: {
        width: '90%',
        height: '90%',
    },
    details: {
        flex: 1,
    },
    category: {
        fontSize: 10,
        fontWeight: '700',
        color: '#9CA3AF',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        lineHeight: 20,
        marginBottom: 6,
        height: 40,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: '800',
        color: '#111827',
    },
    wishlistButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
        backgroundColor: '#FFF',
        borderRadius: 20,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 'auto',
    },
    addToCartBtn: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    addToCartText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
    },
    buyNowBtn: {
        flex: 1,
        backgroundColor: '#2563EB',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyNowText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
