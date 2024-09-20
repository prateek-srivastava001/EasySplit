import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';  // Import icons for the profile and navigation
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';  // Import for using colors based on theme

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
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Profile Icon on the Top Right */}
      <View style={styles.topRight}>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle-outline" size={32} color={Colors.light.text} />
        </TouchableOpacity>
      </View>

      {/* Center greeting */}
      <ThemedText type="title" style={styles.title}>Hello, {name}!</ThemedText>

      {/* Logout button */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>Logout</ThemedText>
      </TouchableOpacity>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="home-outline" size={28} color='#008000' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={28} color={Colors.light.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-outline" size={28} color={Colors.light.text} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  topRight: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
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
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
