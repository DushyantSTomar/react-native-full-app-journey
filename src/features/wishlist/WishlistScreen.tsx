import React, { useCallback, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../store';
import { removeFromWishlist } from './wishlistSlice';
import { addToCart } from '../cart/cartSlice';
import { styles as productStyles, COLUMN_COUNT } from '../products/styles';
import { styles } from './styles';
import { Product } from '../../api/services/product.service';
import { HeartIcon } from '../../components/icons/HeartIcon';

const WishlistScreen = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const navigation = useNavigation();

    const handleRemove = useCallback((id: number) => {
        dispatch(removeFromWishlist(id));
    }, [dispatch]);

    const handleAddToCart = useCallback((item: Product) => {
        dispatch(addToCart(item));
        dispatch(removeFromWishlist(item.id));
    }, [dispatch]);

    const handleNavigateHome = () => {
        navigation.navigate('ProductList' as never);
    };

    const renderItem = useCallback(({ item }: { item: Product }) => {
        return (
            <WishlistItem
                item={item}
                onRemove={() => handleRemove(item.id)}
                onAddToCart={() => handleAddToCart(item)}
            />
        );
    }, [handleRemove, handleAddToCart]);

    if (wishlistItems.length === 0) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Your wishlist is empty</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={productStyles.container}>
            <FlatList
                data={wishlistItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={COLUMN_COUNT}
                columnWrapperStyle={productStyles.columnWrapper}
                contentContainerStyle={productStyles.listContent}
                ListFooterComponent={() => (
                    <View style={{ padding: 16, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.button} onPress={handleNavigateHome}>
                            <Text style={styles.buttonText}>Add more items</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const WishlistItem = ({ item, onRemove, onAddToCart }: { item: Product; onRemove: () => void; onAddToCart: () => void }) => {
    const [imageError, setImageError] = useState(false);
    const DUMMY_IMAGE = 'https://placehold.co/300x300.png?text=No+Image';

    const getImageUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('placehold.co') && !url.includes('.png')) {
            return url.replace(/([\d]+x[\d]+)/, '$1.png');
        }
        return url;
    };

    const imageUrl = getImageUrl(item.image_url);
    const imageSource = (imageUrl && !imageError) ? { uri: imageUrl } : { uri: DUMMY_IMAGE };

    return (
        <View style={productStyles.cardContainer}>
            <View style={[productStyles.card, styles.wishlistCard]}>
                <TouchableOpacity
                    onPress={onRemove}
                    style={styles.removeButton}
                >
                    <HeartIcon filled={true} />
                </TouchableOpacity>

                <Image
                    source={imageSource}
                    style={productStyles.image}
                    resizeMode="contain"
                    onError={() => setImageError(true)}
                />
                <View style={productStyles.details}>
                    <Text style={[productStyles.title, { minHeight: 40 }]} numberOfLines={2}>{item.title}</Text>
                    <Text style={productStyles.price}>${(Number(item.price) || 0).toFixed(2)}</Text>
                    <Text style={productStyles.category}>{item.category}</Text>
                    <TouchableOpacity style={styles.addToCartButton} onPress={onAddToCart}>
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default WishlistScreen;
