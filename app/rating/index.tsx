import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";

const Rating = () => {
  const params = useLocalSearchParams();
  const order = params.order
    ? JSON.parse(params.order as string)
    : { storeTitle: "Starbucks Coffee" };
  const navigation = useNavigation();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleStarPress = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    // Handle the submit action here, like sending the review to the server.
    navigation.goBack(); // Navigate back to the previous page, presumably the orders page.
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkButton}>
            <Feather name="flag" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <Image
            source={require("../../assets/icons/starbucks.png")}
            style={styles.shopImage}
          />
          <Text style={styles.title}>How was {order.storeTitle}?</Text>
          <Text style={styles.subtitle}>
            They'll get your feedback, what did you enjoy?
          </Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleStarPress(i)}
                style={styles.starButton}
              >
                <FontAwesome
                  name="star"
                  size={40}
                  color={i < rating ? "#f0c30f" : "#ccc"}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Tell us more (optional)"
            multiline
            value={review}
            onChangeText={setReview}
            onBlur={Keyboard.dismiss}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 60,
    left: 15,
    right: 15,
    zIndex: 1,
  },
  backButton: {
    backgroundColor: "#F2F5F9",
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkButton: {
    backgroundColor: "#F2F5F9",
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80, // To adjust the position for center alignment
  },
  shopImage: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
    width: "60%",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  starButton: {
    marginHorizontal: 5, // Increased spacing between stars
  },
  textInput: {
    height: 170,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 30,
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 32,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
