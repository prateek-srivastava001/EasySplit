import React, { useState, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,Keyboard,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PeopleScreen() {
  const [isFriendModalVisible, setFriendModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFriendsAndRequests = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");

        const friendsResponse = await fetch("https://something-not-sure.onrender.com/friend/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const friendsData = await friendsResponse.json();
        if (friendsData.status === "success") {
          setFriends(friendsData.friends || []);
        }

        const requestsResponse = await fetch("https://something-not-sure.onrender.com/friend/requests/pending", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const requestsData = await requestsResponse.json();
        if (requestsData.status === "success") {
          setPendingRequests(requestsData.requests || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFriendsAndRequests();
  }, []);

  const handleAddFriend = async (senderEmail) => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      // Optimistic UI update
      const newPendingRequests = pendingRequests.filter((request) => request.username !== senderEmail);
      const friendToAdd = pendingRequests.find((request) => request.username === senderEmail);
      setPendingRequests(newPendingRequests);
      setFriends([...friends, friendToAdd]);

      const response = await fetch("https://something-not-sure.onrender.com/friend/confirm", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender_email: senderEmail }),
      });

      const data = await response.json();
      if (data.status !== "success") {
        // Revert the UI changes in case of failure
        setPendingRequests([...newPendingRequests, friendToAdd]);
        setFriends(friends.filter((friend) => friend.username !== senderEmail));
        console.error("Failed to confirm friend request:", data.message);
      }
    } catch (error) {
      // Revert UI changes in case of an error
      const friendToAdd = pendingRequests.find((request) => request.username === senderEmail);
      setPendingRequests([...pendingRequests, friendToAdd]);
      setFriends(friends.filter((friend) => friend.username !== senderEmail));
      console.error("Error confirming friend request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendFriendRequest = async () => {
    if (!email) return;
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch("https://something-not-sure.onrender.com/friend/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.status === "success") {
        alert("Friend request sent!");
        setEmail("");
        setFriendModalVisible(false);
      } else {
        alert("Failed to send request.");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRequests = pendingRequests.filter((request) =>
    request.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Friends</Text>
        <TouchableOpacity
          onPress={() => setFriendModalVisible(true)}
          style={styles.addFriendButton}
        >
          <Ionicons name="person-add-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Add or search friends"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          placeholderTextColor="#999"
        />
      </View>

      <Text style={styles.sectionTitle}>PENDING REQUESTS</Text>
      {filteredRequests.length > 0 ? (
        filteredRequests.map((request, index) => (
          <View key={index} style={styles.friendItem}>
            <Image
              source={{ uri: "https://example.com/placeholder-image.jpg" }}
              style={styles.profileImage}
            />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>
                {request.first_name} {request.last_name}
              </Text>
              <Text style={styles.friendUsername}>{request.username}</Text>
            </View>
            <TouchableOpacity
              style={[styles.addButton, loading && styles.disabledButton]}
              onPress={() => !loading && handleAddFriend(request.sender_email)}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.addButtonText}>ADD</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noRequestsText}>No pending requests.</Text>
      )}

      {/* Your Friends Section */}
      <Text style={styles.sectionTitle}>YOUR FRIENDS</Text>
      {filteredFriends.length > 0 ? (
        filteredFriends.map((friend, index) => (
          <View key={index} style={styles.friendItem}>
            <Image
              source={{ uri: "https://example.com/placeholder-image.jpg" }}
              style={styles.profileImage}
            />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{friend.first_name} {friend.last_name}</Text>
              <Text style={styles.friendUsername}>{friend.username}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noFriendsText}>No friends found.</Text>
      )}

    <Modal
      visible={isFriendModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setFriendModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setFriendModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Friend's Email</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
              />
              <TouchableOpacity style={styles.modalButton} onPress={handleSendFriendRequest}>
                <Text style={styles.modalButtonText}>Add Friend</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    backgroundColor: "black",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  addFriendButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 50,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 16,
    marginTop: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
    searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    height: 40,
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    color: "#fff",
    fontWeight: "bold",
  },
  friendUsername: {
    color: "#999",
  },
  addButton: {
    backgroundColor: "#333",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  noRequestsText: {
    color: "#999",
    textAlign: "center",
  },
  noFriendsText: {
    color: "#999",
    textAlign: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: "center",
    alignItems: "center", 
    backgroundColor: "rgba(0, 0, 0, 0.8)", 
  }, 
  modalContent: { 
    backgroundColor: "#0c0c0c", 
    padding: 20, 
    borderRadius: 18, 
    width: "80%", 
    alignItems: "center", 
  }, 
  modalTitle: { 
    color: "#fff",
    fontSize: 18,
    paddingTop: 12,
    marginBottom: 24,
    textAlign: "left",
    width: "100%",
  },
    modalInput: { 
    width: "100%", 
    backgroundColor: "#222", 
    padding: 10, 
    borderRadius: 12, 
    color: "#000", 
    marginBottom: 10, 
  }, 
  modalButton: { 
    backgroundColor: "#ffffff", 
    padding: 10, 
    marginTop: 12,
    borderRadius: 8, 
    width: "50%", 
    alignItems: "center", 
    marginBottom: 10, 
  }, 
  modalButtonText: { 
    color: "#000", 
    fontWeight: "bold", 
  }});
