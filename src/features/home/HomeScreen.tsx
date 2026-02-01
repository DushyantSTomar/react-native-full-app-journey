import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const HomeScreen = () => {
    const navigation = useNavigation();

    // Dynamic greeting logic
    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours >= 5 && hours < 12) return 'Good Morning,';
        if (hours >= 12 && hours < 17) return 'Good Afternoon,';
        if (hours >= 17 && hours < 21) return 'Good Evening,';
        return 'Good Night,'; // 21:00 - 04:59
    };

    const greeting = getGreeting();

    const categories = [
        { id: 1, name: 'Phone', icon: 'https://cdn-icons-png.flaticon.com/512/0/191.png' },
        { id: 2, name: 'Console', icon: 'https://cdn-icons-png.flaticon.com/512/13/13973.png' },
        { id: 3, name: 'Laptop', icon: 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png' },
        { id: 4, name: 'Camera', icon: 'https://cdn-icons-png.flaticon.com/512/685/685655.png' },
        { id: 5, name: 'Audio', icon: 'https://cdn-icons-png.flaticon.com/512/27/27130.png' },
    ];

    const featuredProducts = [
        { id: 1, title: 'Sony WH-1000XM5', category: 'Audio', price: 349.99, image: 'https://m.media-amazon.com/images/I/61vJtKbAssL._AC_SL1500_.jpg' },
        { id: 2, title: 'MacBook Air M2', category: 'Laptop', price: 999.00, image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1653084303665' },
        { id: 3, title: 'PS5 Digital', category: 'Console', price: 399.99, image: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$' },
    ];

    const handleViewAll = () => {
        navigation.navigate('ProductList' as never);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.greeting}>{greeting}</Text>
                <Text style={styles.title}>Discover the latest</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.bannerContainer}>
                    <View style={styles.bannerTextContainer}>
                        <Text style={styles.bannerTitle}>Summer Sale</Text>
                        <Text style={styles.bannerSubtitle}>Up to 50% off</Text>
                        <TouchableOpacity style={styles.bannerButton} onPress={handleViewAll}>
                            <Text style={styles.bannerButtonText}>Shop Now</Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={{ uri: 'https://pngimg.com/uploads/headphones/headphones_PNG101984.png' }}
                        style={styles.bannerImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
                        {categories.map((cat) => (
                            <TouchableOpacity key={cat.id} style={styles.categoryCard} onPress={handleViewAll}>
                                <View style={styles.categoryIcon}>
                                    <Image source={{ uri: cat.icon }} style={styles.categoryImage} resizeMode="contain" />
                                </View>
                                <Text style={styles.categoryName}>{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Featured</Text>
                        <TouchableOpacity onPress={handleViewAll}>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        data={featuredProducts}
                        keyExtractor={item => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.featuredList}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.featuredCard} onPress={handleViewAll} activeOpacity={0.9}>
                                <View style={styles.featuredImageContainer}>
                                    <Image source={{ uri: item.image }} style={styles.featuredImage} resizeMode="contain" />
                                </View>
                                <View style={styles.featuredDetails}>
                                    <Text style={styles.featuredCategory}>{item.category}</Text>
                                    <Text style={styles.featuredTitle} numberOfLines={1}>{item.title}</Text>
                                    <Text style={styles.featuredPrice}>${item.price}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
