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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import ItemModal from "@/components/item/ItemModal";
import { Store, StoreItem } from "@/app/interfaces";
import TruncateWithShowMore from "@/utils/truncateWithShowMore";
import { formatDate } from "@/utils/formatDate";

const ItemPage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(1));
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

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

  const formattedExpiryDate = formatDate(item.expiryDate);
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
            <View style={styles.imageOverlay}>
              <View style={styles.left_and_discount_container}>
                <View style={styles.leftContainer}>
                  <Text style={styles.left}>{`${item.quantity} Left`}</Text>
                </View>
                <View style={styles.discountContainer}>
                  <Text style={styles.discount}>{`-${item.discount * 100
                    }%`}</Text>
                </View>
              </View>
              <View style={styles.sellerContainer}>
                <Image
                  source={{ uri: store.storeLogo }}
                  style={styles.storeLogo}
                />
                <View>
                  <Text style={styles.storeTitle}>{store.storeTitle}</Text>
                  <Text style={styles.rating}>⭐ {store.storeRating}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View>
              <View style={styles.expiry_container}>
                <View style={styles.expiry_left_container}>
                  <Ionicons
                    style={styles.expiry_date_icon}
                    size={20}
                    name="timer-outline"
                  />
                  <Text style={styles.selfCollectText}>Self-Collect</Text>
                </View>
                <Text
                  style={styles.expiry_date}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                >
                  {`Expiring ${formattedExpiryDate}`}
                </Text>
              </View>
              <View style={styles.paymentInfoContainer}>
                <Text
                  style={styles.paymentInfo}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                >
                  Please pay directly to merchant
                </Text>
              </View>

              <View style={styles.productDetailsContainer}>
                <View style={styles.itemQuantityContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.itemQty}>{`${item.quantity} pcs`}</Text>
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
              <View style={styles.seperator}></View>
              <View style={styles.descriptionHeaderContainer}>
                <Text style={styles.descriptionHeader}>👉 Description</Text>
              </View>
              <TruncateWithShowMore text={item.description} maxLength={200} />
              <View style={styles.seperator}></View>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.button} onPress={openModal}>
            <Text style={styles.buttonText}>Chope Now</Text>
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
    height: 250,
    resizeMode: "cover",
    justifyContent: "space-between",
  },
  imageOverlay: {
    marginLeft: 4,
  },
  left_and_discount_container: {
    flexDirection: "row",
    marginLeft: 8,
  },
  sellerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "black", // Added gray background color
    borderRadius: 20,
    opacity: 0.7,
    right: 2,
  },
  storeLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8,
  },
  storeTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
  expiry_container: {
    width: "100%",
    height: 49,
    flexDirection: "row",
    backgroundColor: "#168F55",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  expiry_left_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  expiry_date: {
    fontSize: 12,
    color: "#168F55",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12, // Ensure enough padding for rounded corners
    paddingVertical: 4,
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
    marginTop: 17,
    marginRight: 10,
  },
  itemQuantityContainer: {
    margin: 10,
    gap: 4,
  },
  productDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
    fontSize: 20,
    margin: 10,
  },
  itemQty: {
    fontSize: 12,
  },
  title: {
    fontSize: 20,
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
    color: "white",
  },
  price: {
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
