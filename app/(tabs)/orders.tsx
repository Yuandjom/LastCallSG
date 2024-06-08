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
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
// import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("Open");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;
  // const navigation = useNavigation();
  const router = useRouter();

  const [openOrders, setOpenOrders] = useState([
    {
      id: "O-125675",
      shop: "Starbucks Coffee",
      items: [
        { name: "Double Cheeseburger", price: 4.99, quantity: 1 },
        { name: "Bag of Breads", price: 15.98, quantity: 2 },
      ],
      status: "Order confirmed",
      collectTime: "Collect today by 10pm",
    },
  ]); // Mock open orders data

  const [closedOrders, setClosedOrders] = useState([]); // Closed orders list

  const handleRedeemPress = (order: React.SetStateAction<null>) => {
    setSelectedOrder(order);
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleConfirm = () => {
    setClosedOrders([
      ...closedOrders,
      { ...selectedOrder, status: "Order completed" },
    ]);
    setOpenOrders(openOrders.filter((order) => order.id !== selectedOrder.id));
    handleModalClose();
  };

  const handleModalClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleRateOrder = (order: never) => {
    router.push({
      pathname: "/rating",
      params: { order: JSON.stringify(order) },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Orders</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("Open")}
          style={styles.tab(activeTab === "Open")}
        >
          <Text style={styles.tabText(activeTab === "Open")}>Scheduled</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Closed")}
          style={styles.tab(activeTab === "Closed")}
        >
          <Text style={styles.tabText(activeTab === "Closed")}>Collected</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {activeTab === "Open" ? (
          openOrders.length > 0 ? (
            openOrders.map((order) => (
              <View key={order.id} style={styles.orderContainer}>
                <View style={styles.shopInfoContainer}>
                  <Image
                    source={require("@/assets/icons/starbucks.png")}
                    style={styles.shopImage}
                  />
                  <View>
                    <Text style={styles.shopName}>{order.shop}</Text>
                    <Text style={styles.shopId}>{order.id}</Text>
                  </View>
                </View>
                {order.items.map((item, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <Text style={styles.itemText}>
                      {item.quantity}x {item.name}
                    </Text>
                    <Text style={styles.itemPrice}>
                      S${item.price.toFixed(2)}
                    </Text>
                  </View>
                ))}
                <View style={styles.statusContainer}>
                  <FontAwesome name="check-circle" size={20} color="green" />
                  <Text style={styles.orderStatus}>{order.status}</Text>
                </View>
                <View style={styles.collectTimeContainer}>
                  <View style={styles.collectTimeLine} />
                  <Text style={styles.collectTime}>{order.collectTime}</Text>
                </View>
                <TouchableOpacity
                  style={styles.redeemButton}
                  onPress={() => handleRedeemPress(order)}
                >
                  <Text style={styles.redeemButtonText}>Redeem</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emoji}>👀</Text>
              <Text style={styles.noOrdersText}>You don't have any orders</Text>
              <Text style={styles.subText}>Save money, reduce waste</Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>Let's save something</Text>
              </TouchableOpacity>
            </View>
          )
        ) : closedOrders.length > 0 ? (
          closedOrders.map((order) => (
            <View key={order.id} style={styles.orderContainer}>
              <View style={styles.shopInfoContainer}>
                <Image
                  source={require("@/assets/icons/starbucks.png")}
                  style={styles.shopImage}
                />
                <View>
                  <Text style={styles.shopName}>{order.shop}</Text>
                  <View style={styles.statusContainer}>
                    <FontAwesome name="check-circle" size={20} color="green" />
                    <Text style={styles.orderStatus}>{order.status}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.shopId}>{order.id}</Text>
              <View style={styles.itemContainer}>
                <Text style={styles.totalItems}>
                  Total{" "}
                  {order.items.reduce(
                    (acc: any, item: { quantity: any }) => acc + item.quantity,
                    0
                  )}{" "}
                  Items
                </Text>
                <Text style={styles.totalPrice}>
                  S$
                  {order.items
                    .reduce(
                      (acc: any, item: { price: any }) => acc + item.price,
                      0
                    )
                    .toFixed(2)}
                </Text>
              </View>

              <View style={styles.collectTimeContainer}>
                <View style={styles.collectTimeLine} />
                <Text style={styles.collectTime}>{order.collectTime}</Text>
              </View>
              <TouchableOpacity
                style={styles.rateButton}
                onPress={() => handleRateOrder(order)}
              >
                <Text style={styles.rateButtonText}>Rate your order</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.noOrdersText}>No closed orders</Text>
          </View>
        )}
      </ScrollView>
      {selectedOrder && (
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
        </Modal>
      )}
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
    alignItems: "left",
    paddingLeft: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: (isActive: any) => ({
    flex: 1,
    paddingVertical: 15,
    borderBottomWidth: isActive ? 2 : 0,
    borderBottomColor: isActive ? "#000" : "transparent",
    alignItems: "center",
  }),
  tabText: (isActive: any) => ({
    color: isActive ? "#000" : "#888",
    fontWeight: isActive ? "bold" : "normal",
  }),
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
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
  orderContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: "90%",
  },
  shopInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  shopImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  rateButton: {
    borderColor: "#28a745",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  rateButtonText: {
    color: "#28a745",
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
});
