import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Account = () => {
  const buttonData = [
    { title: "Payment method", icon: "card", section: "PAYMENT" },
    { title: "Help center", icon: "help-circle", section: "INFORMATION" },
    { title: "Terms and Condition", icon: "document-text", section: "INFORMATION" },
    { title: "About LastCall SG", icon: "information-circle", section: "INFORMATION" },
  ];

  const sections = [...new Set(buttonData.map((button) => button.section))];

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: "https://media.licdn.com/dms/image/D5610AQFE4u2nwCkbdw/image-shrink_800/0/1712033034641?e=2147483647&v=beta&t=BvZlz8yy1HflEvizk4nbz-DHX9NZRbsj6VoRTc6XbC4" }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileEmail}>Email@gmail.com</Text>
          <Text style={styles.profileRole}>Eco Warrior</Text>
        </View>
      </View>
      <View style={styles.joinMerchant}>
        <TouchableOpacity>
          <Text style={styles.joinMerchantText}>
            Are you a vendor? <Text style={styles.joinMerchantLink}>Join as Merchant</Text>
          </Text>
        </TouchableOpacity>
      </View>
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionHeader}>{section}</Text>
          {buttonData
            .filter((button) => button.section === section)
            .map((button, index) => (
              <TouchableOpacity key={index} style={styles.button}>
                <Ionicons name={button.icon as any} size={24} color="#000" />
                <Text style={styles.buttonText}>{button.title}</Text>
                <Ionicons name="chevron-forward" size={24} color="#888" style={styles.chevron} />
              </TouchableOpacity>
            ))}
        </View>
      ))}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 70,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileInfo: {
    flexDirection: "column",
  },
  profileEmail: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileRole: {
    fontSize: 14,
    color: "#888",
  },
  joinMerchant: {
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 10,
  },
  joinMerchantText: {
    textAlign: "left",
    color: "#888",
  },
  joinMerchantLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    marginLeft: 15,
    marginBottom: 10,
    color: "#888",
    fontSize: 12,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  chevron: {
    marginLeft: 'auto',
  },
});

