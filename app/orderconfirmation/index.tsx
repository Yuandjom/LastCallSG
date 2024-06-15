import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Store, StoreItem } from "../interfaces";
import { truncateText } from "@/utils/truncateText";
import { formatUTCDate } from "@/utils/formatDate";

const OrderConfirmation = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const handlePress = () => {
    // Add your code here
    router.push({
      pathname: "/orders",
      params: {
        item: JSON.stringify(item),
        store: JSON.stringify(store),
        totalPrice: JSON.stringify(totalPrice),
        orderId: JSON.stringify(orderId),
        quantity: JSON.stringify(quantity),
      },
    });
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
            <Text style={styles.value}>{orderId}</Text>
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
        <TouchableOpacity style={styles.button2} onPress={() => handlePress()}>
          <Text style={styles.buttonText2}>Done</Text>
        </TouchableOpacity>
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
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 15,
  },
  button2: {
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
  buttonText2: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  dottedLine: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: "#000",
    marginVertical: 0,
  },
});

export default OrderConfirmation;
