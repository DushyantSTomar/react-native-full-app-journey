import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../cart/cartSlice';
import { toggleWishlist } from '../wishlist/wishlistSlice';
import { Product } from '../../api/services/product.service';
import { styles } from './detailStyles';
import { RootState } from '../../store';
import { HeartIcon } from '../../components/icons/HeartIcon';

const ProductDetailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { product } = route.params as { product: Product };
    const [imageError, setImageError] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const isWishlisted = wishlistItems.some((item) => item.id === product.id);

    const DUMMY_IMAGE = 'https://placehold.co/300x300.png?text=No+Image';

    const getImageUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('placehold.co') && !url.includes('.png')) {
            return url.replace(/([\d]+x[\d]+)/, '$1.png');
        }
        return url;
    };

    const handleAddToCart = useCallback(() => {
        if (isAdding) return;
        setIsAdding(true);
        dispatch(addToCart(product));
        setTimeout(() => setIsAdding(false), 500);
    }, [isAdding, dispatch, product]);

    const handleBuyNow = useCallback(() => {
        dispatch(addToCart(product));
        navigation.navigate('Checkout' as never);
    }, [dispatch, product, navigation]);

    const handleToggleWishlist = useCallback(() => {
        dispatch(toggleWishlist(product));
    }, [dispatch, product]);

    const imageUrl = getImageUrl(product.image_url);
    const imageSource = (imageUrl && !imageError) ? { uri: imageUrl } : { uri: DUMMY_IMAGE };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.imageContainer}>
                    <Image
                        source={imageSource}
                        style={styles.image}
                        resizeMode="contain"
                        onError={() => setImageError(true)}
                    />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>${(Number(product.price) || 0).toFixed(2)}</Text>

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>
                        {product.description || 'No description available for this product.'}
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.wishlistButton}
                    onPress={handleToggleWishlist}
                    activeOpacity={0.7}
                >
                    <HeartIcon filled={isWishlisted} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.addToCartButton, { opacity: isAdding ? 0.7 : 1 }]}
                    onPress={handleAddToCart}
                    disabled={isAdding}
                    activeOpacity={0.7}
                >
                    <Text style={styles.addToCartText}>
                        {isAdding ? 'Adding...' : 'Add to Cart'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buyNowButton}
                    onPress={handleBuyNow}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buyNowText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetailScreen;
