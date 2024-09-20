import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SignupScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleSignup = async () => {
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
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Create an Account</ThemedText>
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="First Name"
          placeholderTextColor={Colors[colorScheme ?? 'light'].text}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Last Name"
          placeholderTextColor={Colors[colorScheme ?? 'light'].text}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Username"
          placeholderTextColor={Colors[colorScheme ?? 'light'].text}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Email"
          placeholderTextColor={Colors[colorScheme ?? 'light'].text}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Phone"
          placeholderTextColor={Colors[colorScheme ?? 'light'].text}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Password"
          placeholderTextColor={Colors[colorScheme ?? 'light'].text}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>Sign Up</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText type="default" style={styles.loginText}>
            Already have an account? <ThemedText type="defaultSemiBold" style={styles.loginTextBold}>Login</ThemedText>
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  loginText: {
    fontSize: 14,
  },
  loginTextBold: {
    color: '#007AFF',
  },
});