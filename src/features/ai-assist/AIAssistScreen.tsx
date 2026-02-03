import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { SparklesIcon } from '../../components/icons/SparklesIcon';
import { ProductCard } from './components/ProductCard';
import { Product } from '../../api/services/product.service';
import { AIService } from '../../api/services/ai.service';

const AIAssistScreen = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<Product[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;

        Keyboard.dismiss();
        setLoading(true);
        setHasSearched(true);
        setResults([]);

        try {
            const products = await AIService.searchProducts(query);
            console.warn(products);

            setResults(products);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setResults([]);
        }
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.titleRow}>
                <Text style={styles.headerTitle}>AI Personal Shopper</Text>
                <View style={styles.premiumBadge}>
                    <Text style={styles.premiumText}>PREMIUM</Text>
                </View>
            </View>
            <Text style={styles.headerSubtitle}>
                Tell us what you're looking for, and our AI will curate the perfect selection for you.
            </Text>
        </View>
    );

    const renderEmptyState = () => {
        if (!hasSearched && !loading) {
            return (
                <View style={styles.emptyStateContainer}>
                    <SparklesIcon size={56} color="#CBD5E1" />
                    <Text style={styles.emptyStateText}>
                        Tell me what you're looking for — laptops, phones, or accessories
                    </Text>
                </View>
            );
        }

        if (loading) return null; 

        return (
            <View style={styles.emptyStateContainer}>
                <SparklesIcon size={48} color="#CBD5E1" />
                <Text style={styles.emptyStateText}>
                    {results?.length === 0 ? "No matches found. Try a different query." : ""}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* Search Area */}
                    <View style={styles.searchContainer}>
                        {renderHeader()}

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="E.g., 'Find me a stylish summer outfit for a beach party under $200'"
                                placeholderTextColor="#9CA3AF"
                                value={query}
                                onChangeText={setQuery}
                                multiline
                                numberOfLines={3}
                                returnKeyType="search"
                                onSubmitEditing={handleSearch}
                            />
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.askButton,
                                { opacity: query.trim() ? 1 : 0.6 }
                            ]}
                            onPress={handleSearch}
                            disabled={!query.trim() || loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#111827" size="small" />
                            ) : (
                                <>
                                    <SparklesIcon size={20} color="#111827" />
                                    <Text style={styles.askButtonText}>Ask AI to Find It</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        {loading && (
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color="#00F0FF" />
                                <Text style={styles.loaderText}>AI is analyzing 5,000+ products...</Text>
                            </View>
                        )}
                    </View>
                    {!loading && (
                        <FlatList
                            data={results}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <ProductCard item={item} />}
                            numColumns={2}
                            columnWrapperStyle={styles.columnWrapper}
                            contentContainerStyle={styles.resultsContent}
                            ListEmptyComponent={renderEmptyState}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default AIAssistScreen;
