import React, { useEffect, useState } from "react";
import {
  Text,
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import emailjs from "@emailjs/react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import uuid from "react-native-uuid";
import { useAuth } from "../../contexts/AuthContext"; // Adjust the path as needed
import { useGuestEmail } from "../../contexts/GuestEmailContext"; // Adjust the path as needed
import Toast from "react-native-toast-message";
import { formatUTCDate } from "@/utils/formatDate";

interface MyModalProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setContact: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  item: any;
  store: any;
  backToItemQuantity: () => void;
  quantity: number;
}

const sendEmail = (
  email: string,
  orderId: string,
  storeAddress: string,
  storeTitle: string,
  collectionDate: string
) => {
  const templateParams = {
    to_email: email,
    orderNo: orderId, // NEED CHANGE THIS IN THE FUTURE
    storeAddress,
    storeTitle,
    collectionDate,
  };

  emailjs
    .send("service_pnhm3u3", "template_tbgbf6s", templateParams, {
      publicKey: "KO3JCNu1y1Fm5WelG",
    })
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (err) => {
        console.log("FAILED...", err);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to send email",
          topOffset: 60,
        });
      }
    );
};

const ItemReservation: React.FC<MyModalProps> = ({
  setEmail,
  setName,
  setContact,
  onClose,
  item,
  store,
  backToItemQuantity,
  quantity,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const { guestEmail, setGuestEmail } = useGuestEmail();
  const [orderId, setOrderId] = useState("");
  const [username, setUsernameState] = useState(user?.username || "guest");
  const [contact, setContactState] = useState("");
  const [email, setEmailState] = useState(user?.email || "");
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isPaid = false;
  const collectionDate = formatUTCDate();
  useEffect(() => {
    setOrderId(uuid.v4().slice(0, 18) as string); // Generate a unique ID using react-native-uuid each time it loads
  }, []);

  useEffect(() => {
    setIsFormValid(email !== "" && validateEmail(email));
  }, [email]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // CALCULATING TOTALS & DISCOUNTS
  let totalPrice: string = (item.finalPrice * quantity).toFixed(2);
  let price: string = item.finalPrice;
  let discount: string = (item.finalPrice * item.discount * quantity).toFixed(
    2
  );
  const closeItemReservation = () => {
    onClose();
    backToItemQuantity();
  };

  const handlePress = async () => {
    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Please enter a valid email address.",
        topOffset: 60,
        visibilityTime: 3000,
      });
      return;
    }

    if (isFormValid) {
      const orderData = {
        id: orderId,
        username: user?.username || username, // Include the username in the order data
        contact,
        email,
        item,
        quantity,
        price,
        totalPrice,
        discount,
        storeLogo: store.storeLogo,
        storeTitle: store.storeTitle,
        store,
        isPaid,
      };
      setHasSubmitted(true);

      sendEmail(
        email,
        orderId,
        store.storeTitle,
        store.storeAddress,
        collectionDate
      );

      // Save the order to backend, if no logged in, we call hook to set this guest email locally only.
      if (!user) {
        setGuestEmail(email);
      }
      try {
        const response = await fetch(
          "https://411r12agye.execute-api.ap-southeast-1.amazonaws.com/orders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          }
        );

        if (response.ok) {
          console.log("Adding new order ok.");
          onClose();
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Order placed successfully",
          });
          router.push({
            pathname: "/orderconfirmation",
            params: {
              item: JSON.stringify(item),
              store: JSON.stringify(store),
              totalPrice: JSON.stringify(totalPrice),
              orderId: JSON.stringify(orderId),
              quantity: JSON.stringify(quantity),
            },
          });
        } else {
          throw Error("Post API Error");
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
        });
        onClose();
      }
    }
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalOverlay}>
                <View style={styles.headerRow}>
                  <TouchableOpacity
                    onPress={backToItemQuantity}
                    style={styles.backButton}
                  >
                    <Ionicons name="arrow-back" size={32} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.header}>Contact Details</Text>
                  <TouchableOpacity
                    onPress={closeItemReservation}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close-outline" size={32} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Text>Email</Text>
                  <TextInput
                    style={styles.emailInput}
                    placeholder="ilhhasap@gmail.com"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setEmailState(text);
                    }}
                    placeholderTextColor="#B2BAC5"
                  />
                  <Text>Contact </Text>
                  <TextInput
                    style={styles.contactInput}
                    placeholder="91234567 (Optional)"
                    value={contact}
                    keyboardType="number-pad"
                    onChangeText={(text) => {
                      setContact(text);
                      setContactState(text);
                    }}
                    placeholderTextColor="#B2BAC5"
                  />

                  <TouchableOpacity
                    onPress={handlePress}
                    style={[
                      styles.confirmationButton,
                      !isFormValid && styles.confirmationButtonDisabled,
                      hasSubmitted && styles.confirmationButtonDisabled,
                    ]}
                    disabled={!isFormValid || hasSubmitted}
                  >
                    <Text style={styles.confirmationText}>
                      {"Confirm Purchase"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
      <Toast topOffset={150} />
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  emailnput: {
    height: 40,
    borderColor: "#CBD5E1",
    borderWidth: 1,
    marginBottom: 12,
    marginTop: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },

  contactInput: {
    height: 40,
    borderColor: "#CBD5E1",
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
  emailInput: {
    height: 40,
    borderColor: "#CBD5E1",
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
  backButton: {
    backgroundColor: "#F2F5F9",
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  seperator: {
    height: 1, // Height of the line
    backgroundColor: "#EEEEEE", // Color of the line
    width: "80%", // Full width of the container
    marginVertical: 10, // Margin around the line
  },
  inputContainer: {
    marginTop: "10%",
    width: "100%",
  },

  modalOverlay: {
    backgroundColor: "white",
    minHeight: "30%",
    top: "8%",
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    padding: "5%",
  },
  closeButton: {
    backgroundColor: "#F5F2F9",
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  confirmationText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  confirmationButton: {
    backgroundColor: "#168F55",
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  confirmationButtonDisabled: {
    backgroundColor: "gray",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    height: "40%",
  },
});

export default ItemReservation;
