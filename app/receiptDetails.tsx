import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation from React Navigation

const ReceiptDetails = () => {
  const { receipt } = useLocalSearchParams();
  const navigation = useNavigation(); // Access the navigation object

  // Parse the receipt data
  const receiptData = Array.isArray(receipt)
    ? JSON.parse(receipt[0]) // Take the first element if it's an array
    : JSON.parse(receipt || "{}"); // Parse if it's a string, or use an empty object as fallback

  // Update the header to keep the default back arrow with the tail, and other style changes
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "", // No title in the header
      headerBackTitleVisible: true, // Keep the back button text for iOS
      headerStyle: {
        backgroundColor: "#1a1a1a", // Dark background for the header
        borderBottomWidth: 0, // Remove the line under the header
        elevation: 0, // Remove the shadow for Android
      },
      headerTintColor: "#fff", // White color for the back arrow and text
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        {/* Title */}
        <ThemedText type="title" style={styles.receiptTitle}>
          {receiptData.store || "McDonald's"}{" "}
        </ThemedText>

        {/* Date and Time */}
        <ThemedText style={styles.dateTimeText}>
          {receiptData.date || "26 Nov 2021"} - {receiptData.time || "04:09pm"}
        </ThemedText>
        <ThemedText style={styles.subTitle}>Purchase details</ThemedText>

        {/* Items List */}
        {receiptData.items.map((item: any, index: number) => (
          <View key={index} style={styles.itemRow}>
            <ThemedText style={styles.itemName}>{item.name}</ThemedText>
            <ThemedText style={styles.itemPrice}>
              ₹{(item.price * item.quantity).toFixed(2)}
            </ThemedText>
          </View>
        ))}

        {/* Total Section */}
        <View style={styles.totalRow}>
          <ThemedText type="title" style={styles.totalText}>
            Total:
          </ThemedText>
          <ThemedText type="title" style={styles.totalText}>
            ₹{receiptData.total.toFixed(2)}
          </ThemedText>
        </View>

        {/* Additional Information */}
        <View style={styles.infoRow}>
          <ThemedText style={styles.infoLabel}>Receipt number:</ThemedText>
          <ThemedText style={styles.infoValue}>
            {receiptData.receiptNumber || "342748328112839"}
          </ThemedText>
        </View>
        <View style={styles.infoRow}>
          <ThemedText style={styles.infoLabel}>Visa Card number:</ThemedText>
          <ThemedText style={styles.infoValue}>
            •••• •••• •••• {receiptData.cardLastFour || "9897"}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a", // Dark background to match the reference
  },
  detailContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16, // Rounded corners
    width: "85%", // Reduce width for a centered look
    marginVertical: 50, // Adds whitespace above and below
    elevation: 4, // Add shadow for iOS
    shadowColor: "#000", // Shadow for Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  receiptTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    textAlign: "left", // Align left as in the reference image
  },
  dateTimeText: {
    fontSize: 14,
    color: "#666", // A bit lighter than black
    marginBottom: 16,
    textAlign: "left",
  },
  subTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    textAlign: "left",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  itemName: {
    fontSize: 16,
    color: "#000",
  },
  itemPrice: {
    fontSize: 16,
    color: "#000",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: "#999",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});

export default ReceiptDetails;
