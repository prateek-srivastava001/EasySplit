import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";

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
  const router = useRouter();

  const handleReceiptClick = (receipt: ReceiptItem) => {
    router.push({
      pathname: "/receiptDetails",
      params: { receipt: JSON.stringify(receipt) },
    });
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Receipts</ThemedText>

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
              <ThemedText
                style={[
                  styles.receiptTotal,
                  { color: receipt.type === "owed" ? "#81FFE8" : "#FF4C24" },
                ]}
              >
                {receipt.type === "owed" ? "You are owed" : "You owe"}
              </ThemedText>
              <ThemedText
                style={[
                  styles.receiptTotal,
                  { color: receipt.type === "owed" ? "#81FFE8" : "#FF4C24" },
                ]}
              >
                ₹{receipt.total.toFixed(2)}
              </ThemedText>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  receiptItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#1e1e1e", // Darker background for the receipt items
    marginBottom: 16,
    borderRadius: 10,
    alignItems: "flex-start", // Align items to the left
  },
  receiptDetails: {
    flexDirection: "column",
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  receiptDate: {
    fontSize: 14,
    color: "#888",
  },
  receiptTotalContainer: {
    alignItems: "flex-end",
  },
  receiptTotal: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Receipt;
