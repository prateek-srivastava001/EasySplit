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
      {/* Profile Title */}
      <Text style={styles.title}>Profile</Text>

      {/* Profile Details */}
      <View style={styles.profileItem}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{name}</Text>
      </View>
      <View style={styles.profileItem}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{username}</Text>
      </View>
      <View style={styles.profileItem}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a1a1a", // Dark background
  },
  title: {
    fontSize: 28, // Larger title font
    fontWeight: "bold",
    color: "#fff", // White text color
    marginBottom: 20,
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#333", // Slightly lighter border to separate fields
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#999", // Lighter color for labels
  },
  value: {
    fontSize: 16,
    color: "#fff", // White color for values
    textAlign: "right",
  },
});

export default ProfileScreen;
