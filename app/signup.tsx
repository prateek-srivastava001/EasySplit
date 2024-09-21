import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SignupScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://something-not-sure.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
        router.replace('/');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
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
            <ThemedText type="title" style={styles.title}>Create an Account</ThemedText>
            <TextInput
              style={[styles.input, { color: '#fff' }]}
              placeholder="First Name"
              placeholderTextColor="#999"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={[styles.input, { color: '#fff' }]}
              placeholder="Last Name"
              placeholderTextColor="#999"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={[styles.input, { color: '#fff' }]}
              placeholder="Username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={[styles.input, { color: '#fff' }]}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, { color: '#fff' }]}
              placeholder="Phone"
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={[styles.input, { color: '#fff' }]}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: firstName && lastName && username && email && phone && password ? '#fff' : '#333' }]}
              onPress={handleSignup}
              disabled={loading || !firstName || !lastName || !username || !email || !phone || !password}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <ThemedText type="defaultSemiBold" style={[styles.buttonText, { color: firstName && lastName && username && email && phone && password ? '#000' : '#999' }]}>
                  Sign Up
                </ThemedText>
              )}
            </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText type="default" style={styles.loginText}>
              Already have an account? <ThemedText type="defaultSemiBold" style={styles.loginTextBold}>Login</ThemedText>
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
    alignItems: 'center',
    backgroundColor: 'black',
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
    borderBottomColor: '#333',
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white',
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
  loginText: {
    fontSize: 14,
    color: 'white',
  },
  loginTextBold: {
    color: '#007AFF',
  },
});
