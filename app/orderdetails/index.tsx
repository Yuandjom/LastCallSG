import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Modal,
  Pressable,
  AppState,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Store, StoreItem } from "../interfaces";
import { truncateText } from "@/utils/truncateText";
import { formatUTCDate } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const OrderDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [qrCodeVisible, setQrCodeVisible] = useState(false);

  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState) => {
  //     if (nextAppState === "active") {
  //       setQrCodeVisible(false);
  //       setTimeout(() => {
  //         Toast.show({
  //           type: "success",
  //           text1: "Payment successful!",
  //           text2: "We look forward to seeing you again.",
  //         });
  //       }, 2000);

  //       router.push("/");
  //     }
  //   };

  //   const subscription = AppState.addEventListener(
  //     "change",
  //     handleAppStateChange
  //   );

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  const showQrCodeModal = () => {
    setQrCodeVisible(true);
  };

  const hideQrCodeModal = () => {
    setQrCodeVisible(false);
  };

  const openGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);

    if (Platform.OS === "ios") {
      // Open in Google Maps app or browser on iOS
      const url = `comgooglemaps://?q=${encodedAddress}`;
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
          );
        }
      });
    } else {
      // Open in Google Maps app or browser on Android
      const url = `geo:0,0?q=${encodedAddress}`;
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
          );
        }
      });
    }
  };

  const item: StoreItem = params.item
    ? JSON.parse(params.item as string)
    : {
        name: "",
        finalPrice: 0,
        originalPrice: 0,
        discount: 0,
        quantity: 0,
        imageURL: "",
        expiryDate: new Date(),
        description: "",
      };
  const store: Store = params.store ? JSON.parse(params.store as string) : null;
  const totalPrice: string = params.totalPrice
    ? JSON.parse(params.totalPrice as string)
    : "0.00";
  const quantity: string = params.quantity
    ? JSON.parse(params.quantity as string)
    : 0;
  const orderId = params.orderId ? JSON.parse(params.orderId as string) : "0";
  const order = params.order ? JSON.parse(params.order as string) : null;
  const openPaymentLink = () => {
    const url =
      "https://www.dbs.com.sg/personal/mobile/paylink/index.html?tranRef=Y6LAoByOW2";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
      <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={25} color="black" />
          </TouchableOpacity>
        <View style={styles.checkmarkContainer}>
          <Image
            source={{
              uri: "https://walaoeh.s3.ap-southeast-1.amazonaws.com/checkmark.png",
            }}
            style={styles.checkmark}
          />
        </View>
        <Text style={styles.message}>We have confirmed your order!</Text>
        <Text style={styles.amount}>S${totalPrice}</Text>
        <View style={styles.orderContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.marketLogo}
              source={
                { uri: store ? store.storeLogo : order.store.storeLogo } as any
              }
            />
          </View>
          <Text style={styles.marketName}>
            {store ? store.storeTitle : order.store.storeTitle}
          </Text>
          <View style={styles.orderDetails}>
            <Text style={styles.label}>Order ID:</Text>
            <Text style={styles.value}>{truncateText(orderId, 30)}</Text>
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.label}>Collect By:</Text>
            <Text style={styles.value}>{formatUTCDate()}</Text>
          </View>
          <Text style={styles.itemLabel}>ITEM</Text>
          <View style={styles.orderDetails}>
            <Text style={styles.item}>
              {quantity}x {truncateText(item.name, 30)}
            </Text>
            <Text style={styles.value}>S${item.finalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.totallabel}>Total:</Text>
            <Text style={styles.totalValue}>
              S${Number(totalPrice).toFixed(2)}
            </Text>
          </View>
        </View>
        <Text style={styles.note}>
          Please collect your order within 7 days. Please only pay for your
          purchase at the store when collecting the items. A confirmation email
          has also been sent to your email address.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => openGoogleMaps(store? store.storeAddress : order.store.storeAddress)}
          >
            <Ionicons
              name="navigate-circle-outline"
              size={32}
              color="rgba(22, 143, 85, 1)"
              style={styles.buttonIcon}
            />
            <Text style={styles.navigateButtonText}>Find Store</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.payButton} onPress={showQrCodeModal}>
            <Ionicons
              name="card-outline"
              size={30}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Pay & Collect</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={qrCodeVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={hideQrCodeModal}
        >
          <Pressable
            style={styles.fullScreenContainer}
            onPress={hideQrCodeModal}
          >
            <Pressable
              style={styles.qrCodeContainer}
              onPress={openPaymentLink} // Add this to handle tap on QR code
            >
              <QRCode
                value={`Payment for orderID ${orderId}`}
                logo={
                  {
                    uri: "https://walaoeh.s3.ap-southeast-1.amazonaws.com/Screenshot_20240615-130536.png",
                  } as any
                }
                logoSize={300}
                size={300}
                logoBackgroundColor="transparent"
              />
            </Pressable>
          </Pressable>
        </Modal>
      </View>
      <Toast topOffset={60} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e9f6f5",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: -40,
    left: 0,
    backgroundColor: "#F2F5F9",
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  checkmarkContainer: {
    backgroundColor: "#d4edda",
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
  checkmark: {
    width: 40,
    height: 40,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#28a745",
  },
  amount: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 70,
    color: "#000",
  },
  orderContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  logoContainer: {
    position: "absolute",
    top: -24,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  marketLogo: {
    width: 64,
    height: 64,
    marginBottom: 20,
    backgroundColor: "#ffffff",
  },
  marketName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#000",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  //need to remake
  itemLabel: {
    fontSize: 12,
    color: "gray",
    width: "100%",
    textAlign: "left",
    right: 140,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  itemsContainer: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 10,
  },
  item: {
    fontSize: 14,
    fontWeight: "bold",
  },
  totallabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    color: "#168F55",
  },
  note: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "#168F55",
    borderRadius: 32,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  link: {
    fontSize: 16,
    color: "#168F55",
    textDecorationLine: "underline",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  button2: {
    backgroundColor: "#007BFF",
    borderRadius: 32,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },

  dottedLine: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: "#000",
    marginVertical: 0,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ensure it takes the full width
  },
  box: {
    width: 400,
    height: 400,
  },
  qrCodeContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  navigateButton: {
    borderColor: "rgba(22, 143, 85, 1)",
    borderWidth: 1.5,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  payButton: {
    backgroundColor: "rgba(22, 143, 85, 1)",
    borderRadius: 32,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  navigateButtonText: {
    color: "rgba(22, 143, 85, 1)",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default OrderDetails;
