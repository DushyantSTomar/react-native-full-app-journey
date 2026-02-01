import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    greeting: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '600',
        marginBottom: 4,
    },
    title: {
        fontSize: 24,
        color: '#111827',
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    section: {
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    viewAll: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563EB',
    },
    categoriesList: {
        paddingHorizontal: 16,
        gap: 12,
    },
    categoryCard: {
        alignItems: 'center',
        marginRight: 16,
        gap: 8,
    },
    categoryIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    categoryImage: {
        width: 32,
        height: 32,
    },
    categoryName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4B5563',
    },
    featuredList: {
        paddingHorizontal: 20,
        gap: 16,
    },
    featuredCard: {
        width: width * 0.75,
        height: 280,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        overflow: 'hidden',
    },
    featuredImageContainer: {
        height: 160,
        width: '100%',
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    featuredImage: {
        width: '80%',
        height: '80%',
    },
    featuredDetails: {
        padding: 16,
        flex: 1,
        justifyContent: 'center',
    },
    featuredCategory: {
        fontSize: 10,
        fontWeight: '700',
        color: '#9CA3AF',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    featuredTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    featuredPrice: {
        fontSize: 18,
        fontWeight: '800',
        color: '#2563EB',
    },
    bannerContainer: {
        marginHorizontal: 20,
        marginTop: 20,
        height: 180,
        backgroundColor: '#111827',
        borderRadius: 20,
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems: 'center',
    },
    bannerTextContainer: {
        flex: 1,
        padding: 24,
    },
    bannerTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 8,
        lineHeight: 30,
    },
    bannerSubtitle: {
        color: '#9CA3AF',
        fontSize: 14,
        marginBottom: 16,
    },
    bannerButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    bannerButtonText: {
        color: '#111827',
        fontWeight: '700',
        fontSize: 14,
    },
    bannerImage: {
        width: '40%',
        height: '100%',
    },
});
