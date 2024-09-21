  import React, { useState } from "react";
  import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
  import { ThemedText } from "@/components/ThemedText";

  interface ReceiptItem {
    id: number;
    store: string;
    date: string;
    total: number;
    type: "owed" | "owe";
    items: Array<{ name: string; quantity: number; price: number }>; // Add this line to define items
  }

  interface ReceiptProps {
    previousReceipts: ReceiptItem[];
  }

  const Receipt: React.FC<ReceiptProps> = ({ previousReceipts }) => {
    const [selectedReceiptId, setSelectedReceiptId] = useState<number | null>(null);

    const handleReceiptClick = (id: number) => {
      setSelectedReceiptId(id === selectedReceiptId ? null : id);
    };

    const selectedReceipt = previousReceipts.find(receipt => receipt.id === selectedReceiptId);

    return (
      <View style={styles.receiptContainer}>
        {previousReceipts.map((receipt) => (
          <TouchableOpacity key={receipt.id} onPress={() => handleReceiptClick(receipt.id)}>
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

        {/* Render detailed view if a receipt is selected */}
        {selectedReceipt && (
          <View style={styles.detailContainer}>
            <ThemedText type="title" style={styles.detailTitle}>
              Receipt Details
            </ThemedText>
            {selectedReceipt.items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <ThemedText>
                  {item.name} (x{item.quantity}) - ${ (item.price * item.quantity).toFixed(2)}
                </ThemedText>
              </View>
            ))}
            <View style={styles.totalRow}>
              <ThemedText type="title">Total:</ThemedText>
              <ThemedText type="title">${selectedReceipt.total.toFixed(2)}</ThemedText>
            </View>
          </View>
        )}
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
    detailContainer: {
      padding: 20,
      backgroundColor: "#f0f0f0",
      borderRadius: 10,
      marginTop: 16,
    },
    detailTitle: {
      fontSize: 18,
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
  });

  export default Receipt;
