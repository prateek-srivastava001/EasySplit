import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router"; // Import useRouter for navigation

interface ReceiptItem {
  id: number;
  store: string;
  date: string;
  total: number;
  type: "owed" | "owe";
  items: Array<{ name: string; quantity: number; price: number }>;
}

interface ReceiptProps {
  previousReceipts: ReceiptItem[];
}

const Receipt: React.FC<ReceiptProps> = ({ previousReceipts }) => {
  const router = useRouter(); // Initialize router

  const handleReceiptClick = (receipt: ReceiptItem) => {
    // Navigate to the new screen and pass the receipt data as params
    router.push({
      pathname: "/receiptDetails",
      params: { receipt: JSON.stringify(receipt) }, // Pass the receipt as a string
    });
  };

  return (
    <View style={styles.receiptContainer}>
      {previousReceipts.map((receipt) => (
        <TouchableOpacity
          key={receipt.id}
          onPress={() => handleReceiptClick(receipt)}
        >
          <View style={styles.receiptItem}>
            <View style={styles.receiptDetails}>
              <ThemedText style={styles.storeName}>{receipt.store}</ThemedText>
              <ThemedText style={styles.receiptDate}>{receipt.date}</ThemedText>
            </View>
            <View style={styles.receiptTotalContainer}>
              <ThemedText style={styles.receiptTotal}>
                {receipt.type === "owed" ? "You are owed" : "You owe"}
              </ThemedText>
              <ThemedText style={styles.receiptTotal}>
                ${receipt.total.toFixed(2)}
              </ThemedText>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  receiptContainer: {
    padding: 16,
  },
  receiptItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: "100%",
    position: "relative",
  },
  receiptDetails: {
    flexDirection: "column",
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  receiptDate: {
    fontSize: 14,
    color: "#666",
  },
  receiptTotalContainer: {
    position: "absolute",
    right: 20,
    bottom: 10,
    alignItems: "flex-end",
  },
  receiptTotal: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#008000",
    textAlign: "right",
    padding: 0,
    margin: 0,
  },
});

export default Receipt;
