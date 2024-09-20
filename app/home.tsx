import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icons for UI
import { Colors } from '@/constants/Colors'; // Import colors for themes

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
        <Ionicons name="search-outline" size={20} color={Colors.light.text} style={styles.searchIcon} />
      </View>

      {/* Dashboard Summary Section */}
      <View style={styles.dashboardContainer}>
        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardTextTitle}>Overview</Text>
          <Text style={styles.dashboardTextValue}>Aug. expense</Text>
          <Text style={styles.dashboardTextValue}>$3,475</Text>
        </View>
        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardTextTitle}>Categories</Text>
          <Text style={styles.dashboardTextValue}>Top Category</Text>
          <Text style={styles.dashboardTextValue}>Food</Text>
        </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  dashboardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dashboardCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    marginRight: 10,
  },
  dashboardTextTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  dashboardTextValue: {
    fontSize: 14,
    color: '#888',
  },
  receiptsContainer: {
    flex: 1,
  },
  receiptsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  receiptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
  },
  receiptText: {
    fontSize: 16,
    color: '#333',
  },
  receiptPrice: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
});
