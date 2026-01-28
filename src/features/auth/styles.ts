import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 50,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    passwordContainer: {
        marginBottom: 16,
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    passwordInput: {
        flex: 1,
        padding: 12,
    },
    eyeIcon: {
        padding: 10,
    },
    footer: {
        marginTop: 16,
        alignItems: 'center',
    },
    linkText: {
        color: 'blue',
        fontWeight: 'bold',
        marginTop: 8,
    },
    // SignUp specific
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        marginTop: 50,
    },
    label: {
        marginBottom: 8,
        fontWeight: '600',
    },
    marginBottom24: {
        marginBottom: 24,
    }
});
