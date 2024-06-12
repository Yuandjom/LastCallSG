import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Store, StoreItem } from "../interfaces";
import { useAuth } from "../../contexts/AuthContext";

const Orders = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth(); // Get the current user

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
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://411r12agye.execute-api.ap-southeast-1.amazonaws.com/orders"
      );
      if (response.ok) {
        const data = await response.json();
        // Filter orders based on the current user's username
        if (user) {
          const filteredOrders = data.filter(
            (order: any) => order.username === user.username
          );
          setOrders(filteredOrders);
        } else {
          console.log("No username");
        }
      } else {
        console.log(response);
        throw new Error("Failed to fetch all orders");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders().finally(() => setRefreshing(false));
  };

  const handleRateOrder = (order: any) => {
    router.push({
      pathname: "/rating",
      params: { order: JSON.stringify(order) },
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Orders</Text>
      </View>
      <View style={styles.orderHistoryContainer}>
        <Text style={styles.orderHistoryText}>My Order History</Text>
        <View style={styles.line} />
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {orders.length > 0 ? (
            orders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderContainer}
                onPress={() => handleRateOrder(order)}
              >
                <View style={styles.shopInfoContainer}>
                  <Image
                    source={{ uri: order.storeLogo }}
                    style={styles.shopImage}
                  />
                  <View>
                    <Text style={styles.shopName}>{order.storeTitle}</Text>
                    <View style={styles.reservedContainer}>
                      <Text style={styles.reservedText}>Reserved</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.itemContainer}>
                  <Text style={styles.itemName}>{order.itemName}</Text>
                  <Text style={styles.itemPrice}>S${order.totalPrice}</Text>
                </View>

                <View style={styles.unitsContainer}>
                  <Text style={styles.unitsText}>
                    {order.quantity} {order.quantity === 1 ? "unit" : "units"}
                  </Text>
                </View>

                <View style={styles.collectTimeContainer}>
                  <View style={styles.collectTimeLine} />
                  <Text style={styles.collectTime}>
                    Collect by{" "}
                    {formatDate(
                      new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emoji}>👀</Text>
              <Text style={styles.noOrdersText}>You don't have any orders</Text>
              <Text style={styles.subText}>Save money, reduce waste</Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.linkText}>Let's save something</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

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
  reservedContainer: {
    backgroundColor: "rgba(16, 110, 51, 1)",
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 5,
    width: 70,
  },
  reservedText: {
    color: "#fff",
    fontSize: 12,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  unitsContainer: {
    marginBottom: 10,
    backgroundColor: "rgba(255, 247, 232, 1)",
    width: 50,
    paddingVertical: 3,
  },
  unitsText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
    color: "rgba(201, 140, 19, 1)",
  },
  collectTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(255, 247, 232, 1)",
  },
  collectTimeLine: {
    width: 4,
    height: 31,
    backgroundColor: "rgba(251, 175, 24, 1)",
    marginRight: 10,
  },
  collectTime: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Orders;
