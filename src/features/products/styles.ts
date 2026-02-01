import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
export const COLUMN_COUNT = 2;
const SPACING = 12;
// Calculate card width based on total width minus padding divided by columns
export const CARD_WIDTH = (width - (SPACING * (COLUMN_COUNT + 1))) / COLUMN_COUNT;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7', // Slightly warmer/softer gray
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
    },
    listContent: {
        padding: SPACING,
        paddingBottom: 100, // Extra space for scrolling past bottom
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: SPACING,
    },
    cardContainer: {
        width: CARD_WIDTH,
        // Remove padding here as the FlatList columnWrapper handles spacing via width calc
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16, // Softer corners
        padding: 10,
        // IOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        // Android Elevation
        elevation: 4,
        height: 340, // Slightly taller for better breathing room
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)', // Subtle border
    },
    imageContainer: {
        width: '100%',
        height: 160,
        backgroundColor: '#F9FAFB', // Subtle background for image area
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
        color: '#1F2937', // Dark gray/almost black
        lineHeight: 20,
        marginBottom: 6,
        height: 40, // Fixed height for 2 lines
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
        backgroundColor: '#FFFFFF', // White background
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB', // Subtle gray border
    },
    addToCartText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151', // Dark gray text
    },
    buyNowBtn: {
        flex: 1,
        backgroundColor: '#2563EB', // Primary Blue
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },
    buyNowText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    loader: {
        marginVertical: 20,
    },
});
