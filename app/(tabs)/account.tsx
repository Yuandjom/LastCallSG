import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Account = () => {
  const buttonData = [
    { title: "Profile", icon: "person" },
    { title: "Notifications", icon: "notifications" },
    { title: "Privacy", icon: "lock-closed" },
    { title: "Security", icon: "shield" },
    { title: "Help", icon: "help-circle" },
    { title: "Dark Mode", icon: "moon" }, // Placeholder for dark mode toggle
  ];

  return (
    <View style={styles.container}>
      {buttonData.map((button, index) => (
        <TouchableOpacity key={index} style={styles.button}>
          <Ionicons name={button.icon as any} size={24} color="#000" />
          <Text style={styles.buttonText}>{button.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
