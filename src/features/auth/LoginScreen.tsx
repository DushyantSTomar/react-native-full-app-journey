import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../auth/AuthContext';
import { useApi } from '../../hooks/useApi';
import { AuthService } from '../../api/services/auth.service';
import EyeIcon from '../../components/icons/EyeIcon';
import EyeOffIcon from '../../components/icons/EyeOffIcon';
import Toast from '../../components/ui/Toast';


const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login } = useAuth();

  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as 'success' | 'error' | 'info' });

  const { loading, error, request, reset } =
    useApi(AuthService.login);

  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setToast({ visible: true, message, type });
  };

  const handleLogin = async () => {
    try {
      const payload = { email, password };
      const res = await request(payload);
      console.log('es.access_token---check -', res.access_token)
      showToast('Login Successful', 'success');
      setTimeout(async () => {
        await login(res.access_token);
      }, 500);
    } catch (err: any) {
      console.log('Login Error:', err);
      const apiMessage = err?.response?.data?.detail || 'Login failed, please try again';
      showToast(apiMessage, 'error');
    }
  };

  return (
    <View style={{ padding: 16, marginTop: 50, flex: 1 }}>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast(prev => ({ ...prev, visible: false }))}
      />

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          reset();
        }}
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16 }}
      />

      <View style={{ marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={text => {
              setPassword(text);
              reset();
            }}
            style={{ flex: 1, padding: 12 }}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={{ padding: 10 }}
          >
            {isPasswordVisible ? (
              <EyeIcon size={24} color="#666" />
            ) : (
              <EyeOffIcon size={24} color="#666" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />

      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: 'blue', fontWeight: 'bold', marginTop: 8 }}>Don't have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
