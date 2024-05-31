import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Platform,
  StatusBar,
  Alert,
  Share,
  ActivityIndicator,
} from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const StorePage = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const items: any[] = params.items ? JSON.parse(params.items as string) : [];

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("Products");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false); // State variable for loader

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleItemPress = (item: { name: string }) => {
    router.push({
      pathname: "/item",
      params: { item: JSON.stringify(item) },
    });
  };

  const handleSharePress = async () => {
    try {
      const result = await Share.share({
        message:
          "Check out this store: Starbucks Coffee, located at 3 Sin Ming Walk, Singapura 575575. They have some great products!",
        url: "https://www.starbucks.com.sg/", // Replace with the actual URL of the store if available
        title: "Starbucks Coffee",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleMapPress = async () => {
    setLoading(true); // Show loader
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        setLoading(false); // Hide loader if permission is denied
        return;
      }

      let location: any = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false); // Hide loader after location is fetched

      router.push({
        pathname: "/interactive-map",
        params: {
          storeLocation: JSON.stringify({
            latitude: 1.351616,
            longitude: 103.837889,
          }),
          userLocation: JSON.stringify(location.coords),
        },
      });
    } catch (error: any) {
      Alert.alert("Error", error.message);
      setLoading(false); // Hide loader if there is an error
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
        <View style={styles.locationWrapper}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={18} />
            <Text style={styles.locationText}>Your Location</Text>
            <Ionicons
              name="chevron-down"
              size={18}
              style={styles.chevronIcon}
            />
          </View>
          <Text style={styles.locationSubText}>Current location · 50 km</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleSharePress}>
          <EvilIcons name="share-apple" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.storeHeader}>
          <View style={styles.backgroundColor} />
          <View style={styles.storeInfo}>
            <Image
              source={require("@/assets/icons/starbucks.png")}
              style={styles.storeLogo}
            />
            <View style={styles.storeTextContainer}>
              <Text style={styles.storeTitle}>Starbucks Coffee</Text>
              <Text style={styles.storeSubtitle}>2.5km • Grocery Store</Text>
            </View>
          </View>
        </View>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Products" && styles.activeTab]}
            onPress={() => setActiveTab("Products")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Products" && styles.tabTextActive,
              ]}
            >
              Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Store Info" && styles.activeTab]}
            onPress={() => setActiveTab("Store Info")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Store Info" && styles.tabTextActive,
              ]}
            >
              Store Info
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === "Products" ? (
          <View style={styles.productsWrapper}>
            {items.map((item, index) => {
              let itemLeftStyle;
              let itemLeftTextColor;
              if (item.left === 1) {
                itemLeftStyle = styles.itemLeftRed;
                itemLeftTextColor = { color: "#B7222A" };
              } else if (item.left > 10) {
                itemLeftStyle = styles.itemLeftGreen;
                itemLeftTextColor = { color: "white" };
              } else {
                itemLeftStyle = styles.itemLeftDefault;
                itemLeftTextColor = { color: "#C98C13" };
              }

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleItemPress(item)}
                  activeOpacity={0.6}
                  delayPressIn={60}
                  style={styles.product}
                >
                  <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.productImage} />
                    <View style={styles.discountTag}>
                      <Text style={styles.discountText}>-10%</Text>
                    </View>
                  </View>
                  <View style={styles.productInfo}>
                    <View style={[styles.itemLeftContainer, itemLeftStyle]}>
                      <Text style={[styles.itemLeft, itemLeftTextColor]}>
                        {item.left} left
                      </Text>
                    </View>
                    <Text style={styles.productName}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.productWasPrice}>
                        was {item.wasPrice}
                      </Text>
                      <Text style={styles.productPrice}>{item.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={styles.storeInfoContainer}>
            <Text style={styles.storeInfoText}>Address</Text>
            <Text style={styles.storeAddress}>
              3 Sin Ming Walk, Singapura 575575
            </Text>
            <TouchableOpacity
              onPress={handleMapPress}
              style={styles.mapContainer}
            >
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 1.351616,
                  longitude: 103.837889,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{ latitude: 1.351616, longitude: 103.837889 }}
                  title="Starbucks Coffee"
                  description="3 Sin Ming Walk, Singapura 575575"
                />
              </MapView>
              {loading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text style={styles.loadingText}>Loading...</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    flex: 1,
  },
  locationWrapper: {
    flex: 4,
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chevronIcon: {
    marginLeft: 4,
  },
  locationSubText: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },
  shareButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  storeHeader: {
    position: "relative",
    marginBottom: 16,
  },
  backgroundColor: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: "#0C5231",
    zIndex: -1,
  },
  storeInfo: {
    position: "relative",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 120,
  },
  storeLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    top: 90,
    marginLeft: 10,
  },
  storeTextContainer: {
    marginLeft: 0,
    marginTop: 40,
  },
  storeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  storeSubtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "left",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#168F55",
  },
  tabText: {
    color: "#64748B",
  },
  tabTextActive: {
    color: "#168F55",
    fontWeight: "600",
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  productsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 8,
  },
  product: {
    width: "48%",
    backgroundColor: "#fff",
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  productInfo: {
    alignItems: "flex-start",
  },
  discountTag: {
    backgroundColor: "red",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    position: "absolute",
    top: 4,
    right: 4,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 4,
  },
  itemLeftContainer: {
    borderRadius: 4,
    marginBottom: 4,
    marginTop: 6,
    width: 50,
    alignItems: "center",
  },
  itemLeftRed: {
    backgroundColor: "#FCEAEB",
    borderColor: "#B7222A",
  },
  itemLeftGreen: {
    backgroundColor: "#56C071",
    borderColor: "darkgreen",
  },
  itemLeftDefault: {
    backgroundColor: "#FDEBD0",
    borderColor: "#FAD7A0",
  },
  itemLeft: {
    fontSize: 11,
    paddingHorizontal: 4,
    paddingVertical: 2,
    textAlign: "center",
    fontWeight: "medium",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  productPrice: {
    fontSize: 14,
    color: "#56C071",
    fontWeight: "bold",
  },
  productWasPrice: {
    fontSize: 12,
    color: "gray",
    textDecorationLine: "line-through",
  },
  storeInfoContainer: {
    padding: 16,
  },
  storeInfoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  storeAddress: {
    fontSize: 16,
    color: "black",
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#0000ff",
  },
});

export default StorePage;
