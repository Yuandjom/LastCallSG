import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Animated,
  Easing,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Store, StoreItem } from "../interfaces";

const Orders = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const router = useRouter();
  const params = useLocalSearchParams();

  const [orders, setOrders] = useState([]);
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://411r12agye.execute-api.ap-southeast-1.amazonaws.com/orders`
        );
        if (response.ok) {
          const data = await response.json();
          setOrders(data); 
        } else {
          throw new Error("Failed to fetch order by ID");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  // const handleRedeemPress = (order) => {
  //   setSelectedOrder(order);
  //   setModalVisible(true);
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start();
  //   Animated.timing(slideAnim, {
  //     toValue: 0,
  //     duration: 300,
  //     easing: Easing.out(Easing.ease),
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const handleConfirm = () => {
  //   setOrders(orders.filter((order) => order.id !== selectedOrder.id));
  //   handleModalClose();
  // };

  // const handleModalClose = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     setModalVisible(false);
  //   });
  //   Animated.timing(slideAnim, {
  //     toValue: 300,
  //     duration: 300,
  //     easing: Easing.in(Easing.ease),
  //     useNativeDriver: true,
  //   }).start();
  // };

  const handleRateOrder = (order: any) => {
    router.push({
      pathname: "/rating",
      params: { order: JSON.stringify(order) },
    });
  };
  console.log(orders);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Orders</Text>
      </View>
      <View style={styles.orderHistoryContainer}>
        <Text style={styles.orderHistoryText}>My Order History</Text>
        <View style={styles.line} />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <View key={order.id} style={styles.orderContainer}>
              <View style={styles.shopInfoContainer}>
                <Image
                  source={{ uri: order.storeLogo }}
                  style={styles.shopImage}
                />
                <View>
                  <Text style={styles.shopName}>{order.storeTitle}</Text>
                  <Text style={styles.shopId}>{order.id}</Text>
                </View>
              </View>

              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>
                  {order.quantity}x {order.itemName}
                </Text>
                <Text style={styles.itemPrice}>S${totalPrice}</Text>
              </View>

              <View style={styles.collectTimeContainer}>
                <Text style={styles.collectTime}>
                  {"Please collect before.."}
                </Text>
              </View>
              <View style={styles.statusContainer}>
                <FontAwesome name="check-circle" size={20} color="green" />
                <Text style={styles.orderStatus}>{"Reserved"}</Text>
              </View>
              {/* <TouchableOpacity
                style={styles.redeemButton}
                onPress={() => handleRedeemPress(order)}
              >
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity> */}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emoji}>👀</Text>
            <Text style={styles.noOrdersText}>You don't have any orders</Text>
            <Text style={styles.subText}>Save money, reduce waste</Text>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.linkText}>Let's save something</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      {/* {selectedOrder && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <Animated.View
            style={[styles.modalBackground, { opacity: fadeAnim }]}
          >
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <Text style={styles.modalTitle}>Redeem now?</Text>
              <Text style={styles.modalSubtitle}>Redeem in:</Text>
              <Text style={styles.modalTimer}>10 minutes</Text>
              <View style={styles.collectTimeContainer}>
                <View style={styles.collectTimeLine} />
                <Text style={styles.collectTime}>
                  Confirm only when you are at the store and ready for
                  collection!
                </Text>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleModalClose}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </Modal> */}
      {/* )} */}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingTop: 50, // Adjust for safe area if needed
    paddingBottom: 10,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    paddingLeft: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  orderHistoryContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  orderHistoryText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  line: {
    height: 3,
    backgroundColor: "#171717",
    width: "100%",
    marginTop: 10,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  orderContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  shopInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  shopImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  shopId: {
    fontSize: 14,
    color: "#888",
  },
  totalItems: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  orderStatus: {
    color: "green",
    marginLeft: 5,
  },
  collectTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  collectTimeLine: {
    width: 4,
    height: "100%",
    backgroundColor: "orange",
    marginRight: 10,
  },
  collectTime: {
    color: "#888",
  },
  redeemButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  redeemButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  modalTimer: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "40%",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "40%",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 20,
  },
  noOrdersText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    color: "#888",
    marginBottom: 20,
  },
  linkText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
