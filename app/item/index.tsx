import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Modal,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import ItemModal from "@/components/item/ItemModal";
import { Store, StoreItem } from "@/app/interfaces";
import TruncateWithShowMore from "@/utils/truncateWithShowMore";
import { calculateTimeLeft } from "@/utils/formatDate";
import { useAuth } from "@/contexts/AuthContext";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { truncateText } from "@/utils/truncateText";


const ItemPage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [fadeAnim] = useState(new Animated.Value(1));
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const handleStorePress = () => {
    router.push({
      pathname: "/store",
      params: {
        items: JSON.stringify(store.items),
        store: JSON.stringify(store),
      },
    });
  };
  const openModal = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    setModalVisible(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleMapPress = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permission to access location was denied",
          text2: "Please grant us location permission to proceed.",
        });
        setLoading(false);
        return;
      }

      let location: any = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);

      router.push({
        pathname: "/interactive-map",
        params: {
          storeLocation: JSON.stringify({
            latitude: store.storeLatitude,
            longitude: store.storeLongitude,
          }),
          userLocation: JSON.stringify(location.coords),
          storeTitle: JSON.stringify(store.storeTitle),
          storeAddress: JSON.stringify(store.storeAddress),
        },
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
      setLoading(false);
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
      weight: 0,
    };
  const store: Store = params.store ? JSON.parse(params.store as string) : null;

  const formattedExpiryDate = item.expiryDate
    .toString()
    .split("T")[0]
    .slice(0, 10);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={() => setImageModalVisible(true)}>
          <ImageBackground source={{ uri: item.imageURL }} style={styles.image}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={20} color="black" />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View>
              <View style={styles.productDetailsContainer}>
                <View style={styles.itemQuantityContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.itemQty}>{`${item.quantity} pcs`}</Text>
                </View>

                <View style={styles.priceDiscountContainer}>
                  <View style={styles.discountContainer}>
                    <Text style={styles.discount}>{`-${item.discount * 100
                      }%`}</Text>
                  </View>
                  <View style={styles.itemPriceContainer}>
                    <Text
                      style={styles.originalPrice}
                    >{`was $${item.originalPrice.toFixed(2)}`}</Text>
                    <Text style={styles.price}>{`S$${item.finalPrice.toFixed(
                      2
                    )}`}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.seperator}></View>

              <Text style={styles.descriptionHeader}>Product</Text>
              <View>
                <View style={styles.expiry_container}>
                  <Text style={{ color: "#B2BAC5" }}>Expiry</Text>
                  <Text style={styles.expiry_date}>
                    {calculateTimeLeft(formattedExpiryDate)}
                  </Text>
                </View>
                <View style={styles.expiry_container}>
                  <Text style={{ color: "#B2BAC5" }}>Weight</Text>
                  <Text style={styles.weightText}>{`${item.weight} kg`}</Text>
                </View>
              </View>
              <View style={styles.descriptionHeaderContainer}>
                {item.description != "None" ? (
                  <Text style={styles.descriptionHeader}>Description</Text>
                ) : null}
              </View>
              <View style={{ paddingHorizontal: 6 }}>
                <TruncateWithShowMore
                  text={item.description == "None" ? "" : item.description}
                  maxLength={200}
                />
              </View>
              <View style={styles.storeInfoContainer}>
                <Text style={styles.storeInfoText}>Pickup Location</Text>

                <Text style={styles.storeAddress}>
                  {store.storeAddress} S({store.storePostalCode})
                </Text>
                <TouchableOpacity
                  onPress={handleMapPress}
                  disabled={true}
                  style={styles.mapContainer}
                >
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: store.storeLatitude,
                      longitude: store.storeLongitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: store.storeLatitude,
                        longitude: store.storeLongitude,
                      }}
                      title={store.storeTitle}
                      description={store.storeAddress}
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
              <TouchableOpacity
                onPress={handleStorePress}
                activeOpacity={0.6}
                delayPressIn={100}
              >
                <View style={styles.storeHeader}>
                  <Image
                    source={{ uri: store.storeLogo as any }}
                    style={styles.storeLogo}
                  />
                  <View style={styles.storeInfo}>
                    <Text style={styles.storeTitle}>
                      {truncateText(store.storeTitle, 20)}
                    </Text>
                    <Text style={styles.rating}>
                      ⭐ {store.storeRating.toFixed(1)}
                    </Text>
                  </View>

                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.button} onPress={openModal}>
            <Text style={styles.buttonText}>Purchase Now</Text>
          </TouchableOpacity>
        </View>
        <ItemModal
          visible={modalVisible}
          onClose={closeModal}
          item={item}
          store={store}
        />
      </Animated.View>

      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.fullScreenContainer}>
          <Pressable
            style={styles.fullScreenButton}
            onPress={() => setImageModalVisible(false)}
          >
            <Image
              source={{ uri: item.imageURL }}
              style={styles.fullScreenImage}
            />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  storeSubtitle: {
    fontSize: 14,
    color: "gray",
  },
  storeInfo: {
    flex: 1,
  },
  storeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 8,
    padding: 8
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#0000ff",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 16,
  },
  storeAddress: {
    fontSize: 16,
    color: "black",
  },
  storeInfoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  storeInfoContainer: {
    padding: 18,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  weightText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  priceDiscountContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  overlay: {
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  backButton: {
    backgroundColor: "#F2F5F9",
    width: 35,
    height: 35,
    borderRadius: 20,
    marginTop: 50,
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    width: "100%",
    backgroundColor: "#FEEFD1",
  },
  paymentInfo: {
    color: "#FBAF18",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    justifyContent: "space-between",
  },
  imageOverlay: {
    marginLeft: 0,
  },
  left_and_discount_container: {
    flexDirection: "row",
    marginLeft: 8,
  },
  sellerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    borderRadius: 0,
    width: "100%",
  },
  storeLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 8,
  },
  storeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  expiry_container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 4,
  },
  expiry_left_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  expiry_date: {
    fontSize: 18,
    color: "#56C071",
    borderRadius: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  expiry_date_icon: {
    color: "white",
    marginRight: 4,
    marginLeft: 4,
  },
  selfCollectText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  itemPriceContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingRight: 8,
  },
  itemQuantityContainer: {
    width: "60%",
    margin: 10,
    gap: 4,
  },
  productDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  seperator: {
    height: 1,
    backgroundColor: "#EEEEEE",
    width: "90%",
    marginVertical: 10,
    alignSelf: "center",
  },
  descriptionHeaderContainer: {
    width: "100%",
    alignSelf: "center",
  },
  descriptionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 10,
    paddingHorizontal: 10,
  },
  itemQty: {
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    gap: 4,
  },
  leftContainer: {
    backgroundColor: "#FBAF18",
    borderRadius: 4,
    padding: 4,
    marginRight: 6,
  },
  left: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
  discountContainer: {
    backgroundColor: "#E52A34",
    borderRadius: 4,
    padding: 4,
    height: "24%",
  },
  discount: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "bold",
    color: "#168F55",
  },
  originalPrice: {
    fontSize: 12,
    color: "#777",
    textDecorationLine: "line-through",
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: "#888",
    margin: 10,
  },
  button: {
    backgroundColor: "#168F55",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 32,
    alignSelf: "center",
    marginBottom: 30,
    width: "90%",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 14,
    paddingVertical: 10,
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
  fullScreenImage: {
    width: "100%", // Ensure the image takes the full width of the screen
    height: "100%", // Ensure the image takes the full height of the screen
    resizeMode: "contain", // Ensure the image maintains aspect ratio and fits within the view
  },
});

export default ItemPage;
