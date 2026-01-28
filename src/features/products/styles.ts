import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const COLUMN_COUNT = 2;
export const CARD_WIDTH = (width - 24) / COLUMN_COUNT - 8;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    listContent: {
        paddingVertical: 12,
        paddingHorizontal: 6,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    cardContainer: {
        width: (width / 2) - 12,
        paddingHorizontal: 6,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        height: 280,
    },
    image: {
        width: '100%',
        height: 150,
        marginBottom: 8,
    },
    details: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 14,
        fontWeight: '400',
        color: '#333',
        lineHeight: 18,
        marginBottom: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 2,
    },
    category: {
        fontSize: 12,
        color: '#777',
        marginTop: 'auto',
    },
    loader: {
        marginVertical: 20,
    }
});
