import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router"; // To get route params

const ReceiptDetails = () => {
  const { receipt } = useLocalSearchParams();

  // Handle case where receipt is an array
  const receiptData = Array.isArray(receipt)
    ? JSON.parse(receipt[0]) // Take the first element if it's an array
    : JSON.parse(receipt || "{}"); // Parse if it's a string, or use an empty object as fallback

  return (
    <View style={styles.detailContainer}>
      {/* Title */}
      <ThemedText type="title" style={styles.receiptTitle}>
        {receiptData.store || "Receipt Title"}{" "}
        {/* Changed from businessName to store */}
      </ThemedText>

      {/* Date and Time */}
      <ThemedText style={styles.dateTimeText}>
        {receiptData.date || "17 Jan 2022"} - {receiptData.time || "04:09pm"}
      </ThemedText>
      <ThemedText style={styles.subTitle}>Purchase details</ThemedText>

      {/* Items List */}
      {receiptData.items.map((item: any, index: number) => (
        <View key={index} style={styles.itemRow}>
          <ThemedText style={styles.itemName}>{item.name}</ThemedText>
          <ThemedText style={styles.itemPrice}>
            ${(item.price * item.quantity).toFixed(2)}
          </ThemedText>
        </View>
      ))}

      {/* Total Section */}
      <View style={styles.totalRow}>
        <ThemedText type="title" style={styles.totalText}>
          Total:
        </ThemedText>
        <ThemedText type="title" style={styles.totalText}>
          ${receiptData.total.toFixed(2)}
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
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 16,
  },
  receiptTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  dateTimeText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
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
