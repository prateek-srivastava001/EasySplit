import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Colors } from "@/constants/Colors"; // Import colors for themes

interface HomeScreenProps {
  username: string; // Define the type of the username prop
}

const HomeScreen: React.FC<HomeScreenProps> = ({ username }) => {
  return (
    <View style={styles.container}>
      {/* Greeting Box */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hello, {username}!</Text>
      </View>

      {/* Overview Box */}
      <View style={styles.dashboardCard}>
        <Text style={styles.dashboardTextTitle}>Overview</Text>
        <Text style={styles.dashboardTextValue}>Aug. expense</Text>
        <Text style={styles.dashboardTextValue}>$3,475</Text>
      </View>

      {/* Recent Receipts Section */}
      <ScrollView style={styles.receiptsContainer}>
        <Text style={styles.receiptsTitle}>Recent Receipts</Text>
        <View style={styles.receiptItem}>
          <Text style={styles.receiptText}>McDonalds</Text>
          <Text style={styles.receiptPrice}>$321.00</Text>
        </View>
        <View style={styles.receiptItem}>
          <Text style={styles.receiptText}>Adidas</Text>
          <Text style={styles.receiptPrice}>$3435.00</Text>
        </View>
        <View style={styles.receiptItem}>
          <Text style={styles.receiptText}>McDonalds</Text>
          <Text style={styles.receiptPrice}>$124.00</Text>
        </View>
        <View style={styles.receiptItem}>
          <Text style={styles.receiptText}>Amazon</Text>
          <Text style={styles.receiptPrice}>$664.00</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 10,
  },
  greetingContainer: {
    alignItems: "center", // Align horizontally to the center
    justifyContent: "center", // Align vertically in case you want vertical centering
    marginBottom: 20, // Space below the greeting
  },
  greetingText: {
    fontSize: 40, // Increased font size
    color: "grey", // Grey color
    fontWeight: "bold",
  },
  dashboardCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  dashboardTextTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  dashboardTextValue: {
    fontSize: 14,
    color: "#888",
  },
  receiptsContainer: {
    flex: 1,
  },
  receiptsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  receiptItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
  },
  receiptText: {
    fontSize: 16,
    color: "#333",
  },
  receiptPrice: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
});

export default HomeScreen;
