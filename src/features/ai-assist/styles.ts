import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FCFCFC', // Very light grey, almost white
    },
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
        backgroundColor: '#FCFCFC',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        flexWrap: 'wrap', // Ensure text doesn't push badge off screen
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#111827', // Dark grey/black
        letterSpacing: 0.5,
        marginRight: 10,
    },
    premiumBadge: {
        backgroundColor: 'transparent',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12, // Pill shape
        borderWidth: 1,
        borderColor: '#D4AF37', // Gold
        justifyContent: 'center',
        alignItems: 'center',
    },
    premiumText: {
        color: '#D4AF37', // Gold
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        fontSize: 15,
        color: '#6B7280', // Medium grey
        lineHeight: 22,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB', // Subtle border
        // Soft Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    input: {
        fontSize: 16,
        color: '#1F2937', // Dark text
        minHeight: 80, // Bigger height
        textAlignVertical: 'top',
        lineHeight: 24,
    },
    askButton: {
        backgroundColor: '#00F0FF', // Neon Cyan
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        // Soft Glow Shadow
        shadowColor: '#00F0FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 6,
    },
    askButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827', // Dark text for contrast
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    loaderContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    loaderText: {
        color: '#00F0FF', // Keep neon loader text
        marginTop: 12,
        fontSize: 14,
        fontWeight: '600',
    },
    resultsContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
    },
    resultsContent: {
        paddingTop: 10,
        paddingBottom: 40,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    emptyStateContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        paddingHorizontal: 40,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#4B5563', // Dark grey
        marginTop: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
});
