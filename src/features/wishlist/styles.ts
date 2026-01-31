import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wishlistCard: {
        height: 'auto',
        minHeight: 320,
        paddingBottom: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    emptyText: {
        fontSize: 18,
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#007AFF', // Standard iOS Blue
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    removeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 16,
        padding: 6
    },
    addToCartButton: {
        marginTop: 12,
        backgroundColor: '#007AFF', // Standard iOS Blue
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    }
});
