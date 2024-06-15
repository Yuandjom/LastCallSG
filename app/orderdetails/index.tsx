import React, { useState } from "react";
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
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Store, StoreItem } from "../interfaces";
import { truncateText } from "@/utils/truncateText";
import { formatUTCDate } from "@/utils/formatDate";

const OrderDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [qrCodeVisible, setQrCodeVisible] = useState(false);

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
              source={{ uri: store.storeLogo } as any}
            />
          </View>
          <Text style={styles.marketName}>{store.storeTitle}</Text>
          <View style={styles.orderDetails}>
            <Text style={styles.label}>Order ID:</Text>
            <Text style={styles.value}>{truncateText(orderId, 30)}</Text>
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{formatUTCDate(new Date())}</Text>
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
          Please collect your order within 7 days. You can pay for your purchase
          at the store counter. A confirmation email has been sent to your email
          address.
        </Text>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() =>
            openGoogleMaps(
              store.storeAddress
            )
          }
        >
          <Text style={styles.buttonText}>Navigate to store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button2]} onPress={showQrCodeModal}>
          <Text style={styles.buttonText}>Pay & Collect</Text>
        </TouchableOpacity>
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
        </Modal>
      </View>
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
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginVertical: 20,
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
    fontSize: 18,
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
});

export default OrderDetails;
