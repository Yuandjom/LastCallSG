import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { router, useRouter, useNavigation } from "expo-router";

const OnboardingScreen3 = () => {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Key Features</Text>
      </View>
      <Image
        source={{
          uri: "https://walaoeh.s3.ap-southeast-1.amazonaws.com/onBoardingFifth.png",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>
        Start saving money and the environment today with LastCall SG!
      </Text>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "(tabs)" } as never], // your stack screen name
          })
        }
      >
        <Text style={styles.continueButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#56C071",
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    alignSelf: "center",
    textAlign: "center",
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

export default OnboardingScreen3;
