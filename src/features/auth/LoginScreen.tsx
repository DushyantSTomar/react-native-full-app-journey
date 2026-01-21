import { View, TextInput, Button, Text } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useApi } from '../../hooks/useApi';
import { AuthService } from '../../api/services/auth.service';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const { loading, error, request, reset } =
    useApi(AuthService.login);

  const handleLogin = async () => {
    try {
      const res = await request(email, password);
      await login(res.token);
    } catch {
      
    }
  };

  return (
    <View style={{ padding: 16,marginTop:50 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          reset(); 
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => {
          setPassword(text);
          reset(); 
        }}
      />

      {error && (
        <Text style={{ color: 'red', marginBottom: 8 }}>
          {error.message}
        </Text>
      )}

      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
};

export default LoginScreen;
