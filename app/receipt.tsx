import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface ReceiptProps {
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  previousReceipts: Array<{
    id: number;
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
  }>;
}

const Receipt: React.FC<ReceiptProps> = ({
  items,
  total,
  previousReceipts,
}) => {
  return (
    <View style={styles.receiptContainer}>
      <ThemedText type="title" style={styles.title}>
        Current Receipt
      </ThemedText>
      {items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <ThemedText>
            {item.name} (x{item.quantity})
          </ThemedText>
          <ThemedText>${(item.price * item.quantity).toFixed(2)}</ThemedText>
        </View>
      ))}
      <View style={styles.totalRow}>
        <ThemedText type="title">Total:</ThemedText>
        <ThemedText type="title">${total.toFixed(2)}</ThemedText>
      </View>

      {/* Previous Receipts Section */}
      <ThemedText type="title" style={styles.historyTitle}>
        Previous Receipts
      </ThemedText>
      <ScrollView style={styles.historyContainer}>
        {previousReceipts.map((receipt) => (
          <View key={receipt.id} style={styles.receiptItem}>
            <ThemedText type="subtitle">Receipt ID: {receipt.id}</ThemedText>
            {receipt.items.map((item, index) => (
              <ThemedText key={index}>
                {item.name} (x{item.quantity}) - $
                {(item.price * item.quantity).toFixed(2)}
              </ThemedText>
            ))}
            <ThemedText type="title">
              Total: ${receipt.total.toFixed(2)}
            </ThemedText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  receiptContainer: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    margin: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  historyContainer: {
    marginTop: 10,
    maxHeight: 150, // Limit height for scrolling
  },
  receiptItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
});

export default Receipt;
