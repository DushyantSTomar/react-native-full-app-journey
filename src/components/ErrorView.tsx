import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
  } from 'react-native';
  
  type Props = {
    message: string;
    loading?: boolean;
    onRetry?: () => void;
  };
  
  const ErrorView = ({ message, loading, onRetry }: Props) => {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>
  
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          onRetry && (
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    message: {
      fontSize: 14,
      color: '#444',
      marginBottom: 12,
      textAlign: 'center',
    },
    retryButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 6,
      backgroundColor: '#000',
    },
    retryText: {
      color: '#fff',
      fontWeight: '600',
    },
  });
  
  export default ErrorView;
  