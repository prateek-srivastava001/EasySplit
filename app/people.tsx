import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function PeopleScreen() {
  const [friends, setFriends] = useState([
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
  ]); // Sample friends list

  const [groups, setGroups] = useState([
    "Family Group",
    "Work Buddies",
    "Travel Mates",
  ]); // Sample groups list

  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [isFriendModalVisible, setFriendModalVisible] = useState(false); // Friend Modal visibility state
  const [isGroupModalVisible, setGroupModalVisible] = useState(false); // Group Modal visibility state
  const [email, setEmail] = useState(""); // Email input state
  const [groupName, setGroupName] = useState(""); // Group name input state

  const handleAddFriend = () => {
    setFriendModalVisible(true); // Show friend modal when Add Friend is pressed
  };

  const handleInviteFriend = () => {
    console.log(`Invite sent to: ${email}`);
    setFriendModalVisible(false); // Close modal after inviting
  };

  const handleAddGroup = () => {
    setGroupModalVisible(true); // Show group modal when Add Group is pressed
  };

  const handleCreateGroup = () => {
    console.log(`Group created: ${groupName}`);
    setGroupModalVisible(false); // Close modal after creating group
  };

  const filteredFriends = friends.filter((friend) =>
    friend.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter((group) =>
    group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends or groups"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          placeholderTextColor="#999"
        />
        <Ionicons
          name="search-outline"
          size={20}
          color={Colors.light.text}
          style={styles.searchIcon}
        />
      </View>

      {/* Friends Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Friends</Text>
        <TouchableOpacity onPress={handleAddFriend}>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={Colors.light.text}
          />
        </TouchableOpacity>
      </View>

      {/* List of Friends */}
      <View style={styles.list}>
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>{friend}</Text>
            </View>
          ))
        ) : (
          <Text>No friends found.</Text>
        )}
      </View>

      {/* Groups Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Groups</Text>
        <TouchableOpacity onPress={handleAddGroup}>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={Colors.light.text}
          />
        </TouchableOpacity>
      </View>

      {/* List of Groups */}
      <View style={styles.list}>
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>{group}</Text>
            </View>
          ))
        ) : (
          <Text>No groups found.</Text>
        )}
      </View>

      {/* Modal for Adding Friend */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isFriendModalVisible}
        onRequestClose={() => setFriendModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a Friend</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter friend's email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleInviteFriend}
                style={styles.inviteButton}
              >
                <Text style={styles.inviteButtonText}>Invite</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFriendModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Adding Group */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isGroupModalVisible}
        onRequestClose={() => setGroupModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create a Group</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter group name"
              value={groupName}
              onChangeText={(text) => setGroupName(text)}
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleCreateGroup}
                style={styles.inviteButton}
              >
                <Text style={styles.inviteButtonText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGroupModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: "#333",
  },
  searchIcon: {
    marginLeft: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  list: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  listItem: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inviteButton: {
    backgroundColor: "#008000",
    padding: 10,
    borderRadius: 8,
  },
  inviteButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
});
