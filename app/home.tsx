import React from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package

interface HomeScreenProps {
  username: string;
}

interface Receipt {
  id: number;
  merchant: string;
  date: string;
  amount: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ username }) => {
  const recentReceipts: Receipt[] = [
    { id: 1, merchant: 'McDonalds', date: '01 Aug, 2024', amount: 848.00 },
    { id: 2, merchant: 'McDonalds', date: '01 Aug, 2024', amount: 848.00 },
    { id: 3, merchant: 'McDonalds', date: '01 Aug, 2024', amount: 848.00 },
    { id: 4, merchant: 'McDonalds', date: '01 Aug, 2024', amount: 848.00 },
  ];

  return (
    <View style={styles.container}>
      
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.greeting2}> {username}!</Text>
      </View>
      
      <View style={styles.overviewCard}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewSubtitle}>Aug. expense</Text>
        <Text style={styles.overviewAmount}>₹3,475</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Recent Receipts</Text>
      
      <ScrollView style={styles.receiptsList}>
        {recentReceipts.map((receipt) => (
          <View key={receipt.id} style={styles.receiptItem}>
            <View>
              <Text style={styles.merchantName}>{receipt.merchant}</Text>
              <Text style={styles.receiptDate}>{receipt.date}</Text>
            </View>
            <Text style={styles.receiptAmount}>₹{receipt.amount.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
      
      {/* <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="camera" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="folder" size={24} color="#666" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '900',
    // fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  greeting2: {
    fontSize: 28,
    fontWeight: '900',
    color: '#999',
    marginBottom: 20,
  },
  greetingContainer: {
    flexDirection: 'row', // Aligns children (texts) in a row
    alignItems: 'center',  // Vertically aligns texts if they have different font sizes
    marginBottom: 0,
  },
  overviewCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  overviewSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  overviewAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  receiptsList: {
    flex: 1,
  },
  receiptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  receiptDate: {
    fontSize: 14,
    color: '#666',
  },
  receiptAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
});

export default HomeScreen;