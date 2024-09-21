import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import HomeScreen from "./home";
import Receipt from "./receipts";
import PeopleScreen from "./people";
import ProfileScreen from "./profile"; // Ensure to import the ProfileScreen

interface ReceiptItem {
  id: number;
  store: string;
  date: string;
  total: number;
  type: "owed" | "owe";
  items: Array<{ name: string; quantity: number; price: number }>;
}

export default function DashboardScreen() {
  const [user, setUser] = useState(null);
  const [activeScreen, setActiveScreen] = useState("home");
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState(""); // State for email
  const [previousReceipts, setPreviousReceipts] = useState<ReceiptItem[]>([
    {
      id: 1,
      store: "Mcdonald's",
      date: "26 Nov 2021",
      total: 321.0,
      type: "owed",
      items: [
        { name: "Big Mac", quantity: 2, price: 5.0 },
        { name: "Fries", quantity: 1, price: 2.5 },
      ],
    },
    {
      id: 2,
      store: "Amazon",
      date: "14 Nov 2021",
      total: 150.0,
      type: "owe",
      items: [
        { name: "Book", quantity: 1, price: 50.0 },
        { name: "Laptop Stand", quantity: 1, price: 100.0 },
      ],
    },
    {
      id: 3,
      store: "WestSide",
      date: "01 Nov 2021",
      total: 75.0,
      type: "owe",
      items: [{ name: "Shirt", quantity: 1, price: 75.0 }],
    },
    {
      id: 4,
      store: "Wendy's",
      date: "24 Nov 2021",
      total: 321.0,
      type: "owed",
      items: [
        { name: "Frosty", quantity: 2, price: 2.0 },
        { name: "Burger", quantity: 2, price: 4.0 },
      ],
    },
  ]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        router.replace("/");
        return;
      }
      const response = await fetch("https://something-not-sure.onrender.com/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setName(userData.user.first_name);
        setUsername(userData.user.username); // Set username
        setEmail(userData.user.email); // Set email
      } else {
        await AsyncStorage.removeItem("accessToken");
        router.replace("/");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      await AsyncStorage.removeItem("accessToken");
      router.replace("/");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case "home":
        return <HomeScreen username={name} />;
      case "receipt":
        return <Receipt previousReceipts={previousReceipts} />;
      case "people":
        return <PeopleScreen />;
      case "profile":
        return <ProfileScreen username={username} name={name} email={email} />; // Pass username, name, and email
      case "settings":
        return <ThemedText>Settings Screen (placeholder)</ThemedText>;
      default:
        return <HomeScreen username={name} />;
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
      {/* Top Icons (Profile and Logout) */}
      <View style={styles.topIconsContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => setActiveScreen("profile")}>
          <Ionicons
            name="person-circle-outline"
            size={32}
            color={Colors.light.text}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={32}
            color={Colors.light.text}
          />
        </TouchableOpacity>
      </View>

      {/* Render the active screen content here */}
      <View style={styles.screenContent}>{renderActiveScreen()}</View>

      {/* Footer Navigation with 4 icons */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setActiveScreen("home")}>
          <Ionicons
            name="home-outline"
            size={28}
            color={activeScreen === "home" ? "#008000" : Colors.light.text}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen("receipt")}>
          <Ionicons
            name="receipt-outline"
            size={28}
            color={activeScreen === "receipt" ? "#008000" : Colors.light.text}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen("people")}>
          <Ionicons
            name="heart-outline"
            size={28}
            color={activeScreen === "people" ? "#008000" : Colors.light.text}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen("settings")}>
          <Ionicons
            name="settings-outline"
            size={28}
            color={activeScreen === "settings" ? "#008000" : Colors.light.text}
          />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 0,
  },
  iconContainer: {
    padding: 10,
  },
  screenContent: {
    flexGrow: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
});
