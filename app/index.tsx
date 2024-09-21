import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(''); // Reset error message
    try {
      const response = await fetch('https://something-not-sure.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('accessToken', data.accessToken);
        router.replace('/friends');
      } else {
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ThemedView style={styles.innerContainer}>
            <ThemedText type="title" style={styles.title}>Login</ThemedText>
            <TextInput
              style={[styles.input, { borderColor: '#333', color: '#fff' }]}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, { borderColor: '#333', color: '#fff' }]}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errorMessage ? (
              <ThemedText type="default" style={styles.errorMessage}>
                {errorMessage}
              </ThemedText>
            ) : null}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: email && password ? '#fff' : '#333' }]}
              onPress={handleLogin}
              disabled={!email || !password || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <ThemedText type="defaultSemiBold" style={[styles.buttonText, { color: email && password ? '#000' : '#999' }]}>
                  Login
                </ThemedText>
              )}
            </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <ThemedText type="default" style={styles.signupText}>
              Don't have an account? <ThemedText type="defaultSemiBold" style={styles.signupTextBold}>Sign Up</ThemedText>
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  signupText: {
    fontSize: 14,
    color: 'white',
  },
  signupTextBold: {
    color: '#007AFF',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
