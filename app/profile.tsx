// ProfileScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProfileScreenProps {
  name: string;
  username: string;
  email: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ name, username, email }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileItem}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{name}</Text>
      </View>
      <View style={styles.profileItem}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{username}</Text>
      </View>
      <View style={styles.profileItem}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Center the title
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between label and value
    marginBottom: 15,
    paddingVertical: 10, // Added vertical padding
    borderBottomWidth: 1, // Add a bottom border for separation
    borderColor: "#e0e0e0", // Light gray color for the border
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    width: "40%", // Set a width for labels to align them properly
  },
  value: {
    fontSize: 16,
    color: "#555", // Slightly lighter color for values
    textAlign: "right", // Align values to the right
    width: "60%", // Set a width for values
  },
});

export default ProfileScreen;
