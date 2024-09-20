import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function DashboardScreen() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        router.replace('/');
        return;
      }

      const response = await fetch('https://something-not-sure.onrender.com/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setName(userData.user.first_name);
      } else {
        await AsyncStorage.removeItem('accessToken');
        router.replace('/');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      await AsyncStorage.removeItem('accessToken');
      router.replace('/');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return <ThemedView style={styles.container}><ThemedText>Loading...</ThemedText></ThemedView>;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Dashboard</ThemedText>
      <ThemedText>Welcome, {name}!</ThemedText>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>Logout</ThemedText>
      </TouchableOpacity>
    </ThemedView>
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
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});