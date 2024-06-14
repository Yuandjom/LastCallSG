import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

const OnboardingScreen2 = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Key Features</Text>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.push("(tabs)")}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: "https://walaoeh.s3.ap-southeast-1.amazonaws.com/onBoardingSecond.png",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Discover -</Text>
      <Text style={styles.description}>
        Easily browse through our inventory of soon-to-expire groceries from top
        retailers. New delicious deals added daily.
      </Text>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.push("/onboarding/third")}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "red",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 75,
    left: 25,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  skipButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight:5,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    width: "80%",
    marginBottom: 30,
    color: "white",
    fontWeight: "400",
  },
  continueButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
});

export default OnboardingScreen2;
