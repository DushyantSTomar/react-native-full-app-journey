import { View, TextInput, Button, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import EyeIcon from '../../components/icons/EyeIcon';
import EyeOffIcon from '../../components/icons/EyeOffIcon';
import Toast from '../../components/ui/Toast';
import CustomModal from '../../components/ui/CustomModal';
import { useApi } from '../../hooks/useApi';
import { AuthService } from '../../api/services/auth.service';
import { styles } from './styles';

const SignUpScreen = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as 'success' | 'error' | 'info' });
    const [modalVisible, setModalVisible] = useState(false);
    const { loading, error, request, reset } = useApi(AuthService.singup);

    const showToast = (message: string, type: 'success' | 'error' = 'error') => {
        setToast({ visible: true, message, type });
    };


    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        const payload = { email, password };

        try {
            const res = await request(payload);
            console.log('Sign Up Response:', res);
            showToast(res?.detail || 'Account created successfully', 'success');
            setModalVisible(true);

        } catch (err: any) {
            console.log('Signup Error:', err);
            const apiMessage =
                err?.response?.data?.detail ||
                'Signup failed, please try again';

            showToast(apiMessage, 'error');
        }
    };



    const handleSuccessModalClose = () => {
        setModalVisible(false);
        navigation.navigate('Login');
    };

    return (
        <View style={styles.safeArea}>
            <Toast
                visible={toast.visible}
                message={toast.message}
                type={toast.type}
                onHide={() => setToast(prev => ({ ...prev, visible: false }))}
            />

            <CustomModal
                visible={modalVisible}
                title="Success"
                message="Account created successfully! Please login."
                actionLabel="Go to Login"
                onAction={handleSuccessModalClose}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.title}>Sign Up</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <View style={styles.passwordInputWrapper}>
                        <TextInput
                            placeholder="Enter password"
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={setPassword}
                            style={styles.passwordInput}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            style={styles.eyeIcon}
                        >
                            {isPasswordVisible ? (
                                <EyeIcon size={24} color="#666" />
                            ) : (
                                <EyeOffIcon size={24} color="#666" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.marginBottom24}>
                    <View style={styles.passwordInputWrapper}>
                        <TextInput
                            placeholder="Confirm password"
                            secureTextEntry={!isConfirmPasswordVisible}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={styles.passwordInput}
                        />
                        <TouchableOpacity
                            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                            style={styles.eyeIcon}
                        >
                            {isConfirmPasswordVisible ? (
                                <EyeIcon size={24} color="#666" />
                            ) : (
                                <EyeOffIcon size={24} color="#666" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <Button
                    title={loading ? 'Signing Up...' : 'Sign Up'}
                    onPress={handleSignUp}
                    disabled={loading}
                />

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.linkText}>Already have an account?</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

export default SignUpScreen;
