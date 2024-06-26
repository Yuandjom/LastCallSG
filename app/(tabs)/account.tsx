// app/Account.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import useRouter hook
import { useAuth } from '../../contexts/AuthContext'; // Adjust the path as needed

const Account = () => {
  const router = useRouter(); // Get the router object
  const { user, logout } = useAuth();

  const buttonData = [
    { title: 'Payment Method', icon: 'card', section: 'PAYMENT', feature: 'Payment Method' },
    { title: 'Help Center', icon: 'help-circle', section: 'INFORMATION', feature: 'Help Center' },
    { title: 'Terms and Conditions', icon: 'document-text', section: 'INFORMATION', feature: 'Terms and Conditions' },
    { title: 'About LastCall SG', icon: 'information-circle', section: 'INFORMATION', feature: 'About LastCall SG', onPress: () => router.push('/onboarding') }, // Add onPress handler for specific navigation
  ];

  const sections = [...new Set(buttonData.map(button => button.section))];

  const handleNavigate = (feature) => {
    router.push({ pathname: '/comingsoon', params: { feature } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Account</Text>
      </View>
      {user && (
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://walaoeh.s3.ap-southeast-1.amazonaws.com/avatar.png' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileEmail}>{user.username}</Text>
            <Text style={styles.profileRole}>Eco Warrior</Text>
          </View>
        </View>
      )}
      {!user && (
        <View style={styles.joinMerchant}>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.joinMerchantText}>
              Are you a new user? <Text style={styles.joinMerchantLink}>Join us!</Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionHeader}>{section}</Text>
          {buttonData
            .filter(button => button.section === section)
            .map((button, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => button.onPress ? button.onPress() : handleNavigate(button.feature)} // Apply the onPress handler if it exists or navigate to the Coming Soon page
              >
                <Ionicons name={button.icon as any}  size={24} color="#000" />
                <Text style={styles.buttonText}>{button.title}</Text>
                <Ionicons name="chevron-forward" size={24} color="#888" style={styles.chevron} />
              </TouchableOpacity>
            ))}
        </View>
      ))}
      {user && (
        <TouchableOpacity style={styles.logOutButton} onPress={logout}>
          <Text style={styles.logOutButtonText}>Log Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  headerContainer: {
    paddingBottom: 10,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    paddingTop: 60, // Added padding top for the header
    paddingLeft: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingBottom: 15, // Adjust padding as needed
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
    marginLeft: "auto",
  },
  logOutButton: {
    backgroundColor: "rgba(86, 192, 113, 1)",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // Center the logout button
  },
  logOutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Account;