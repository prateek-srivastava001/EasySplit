import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';  
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';  
import HomeScreen from './home';  

export default function DashboardScreen() {
  const [user, setUser] = useState(null);
  const [activeScreen, setActiveScreen] = useState('home'); 
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

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'search':
        return <ThemedText>Search Screen (placeholder)</ThemedText>;
      case 'favorites':
        return <ThemedText>Favorites Screen (placeholder)</ThemedText>;
      case 'settings':
        return <ThemedText>Settings Screen (placeholder)</ThemedText>;
      default:
        return <HomeScreen />;
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
      {/* Profile Icon on the Top Left */}
      <View style={styles.topLeft}>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} color={Colors.light.text} />
        </TouchableOpacity>
      </View>

      {/* Notification Icon on the Top Right */}
      <View style={styles.topRight}>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={32} color={Colors.light.text} />
        </TouchableOpacity>
      </View>

      {/* Center greeting */}
      <ThemedText type="title" style={styles.title}>Hello, {name}!</ThemedText>

      {/* Render the active screen content here */}
      <View style={styles.screenContent}>
        {renderActiveScreen()}
      </View>

      {/* Footer Navigation with 5 icons */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setActiveScreen('home')}>
          <Ionicons name="home-outline" size={28} color={activeScreen === 'home' ? '#008000' : Colors.light.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen('search')}>
          <Ionicons name="search-outline" size={28} color={activeScreen === 'search' ? '#008000' : Colors.light.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen('favorites')}>
          <Ionicons name="heart-outline" size={28} color={activeScreen === 'favorites' ? '#008000' : Colors.light.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen('settings')}>
          <Ionicons name="settings-outline" size={28} color={activeScreen === 'settings' ? '#008000' : Colors.light.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color={Colors.light.text} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  topRight: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    textAlign: 'center',
  },
  screenContent: {
    flexGrow: 1,  // Allow screen content to grow and take available space
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
});
