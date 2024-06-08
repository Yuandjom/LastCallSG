import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import ItemModal from "@/components/item/ItemModal";
import { Store, StoreItem } from "@/app/interfaces";

const ItemPage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(1));

  const [modalVisible, setModalVisible] = useState(false);

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

  const formattedExpiryDate = item.expiryDate.toString().split("T")[0];

  return (
    <View style={styles.container}>
      
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>

      <ImageBackground source={item.imageURL} style={styles.image}>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
        <View style={styles.imageOverlay}>
          <View style={styles.left_and_discount_container}>
            <View style={styles.leftContainer}>
              <Text style={styles.left}>{`${item.quantity} Left`}</Text>
            </View>
            <View style={styles.discountContainer}>
              <Text style={styles.discount}>{`-${item.discount * 100}%`}</Text>
            </View>
          </View>
          <View style={styles.sellerContainer}>
            <Image
              source={store.storeLogo}
              style={styles.storeLogo}
            />
            <View>
              <Text style={styles.storeTitle}>{store.storeTitle}</Text>
              <Text style={styles.rating}>{store.storeRating} ★</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.expiry_container}>
        <Ionicons
          style={styles.expiry_date_icon}
          size={20}
          name="time-outline"
        />
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
          <Text style={styles.price}>{`$${item.finalPrice.toFixed(2)}`}</Text>
        </View>
      </View>
      <View style={styles.seperator}></View>
      <View style={styles.descriptionHeaderContainer}>
        <Text style={styles.descriptionHeader}>👉Description</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.seperator}></View>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Chope Now</Text>
      </TouchableOpacity>

      <ItemModal visible={modalVisible} onClose={closeModal} />
      </Animated.View>

    </View>
  );
};

const styles = StyleSheet.create({

  overlay: {
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 0,
    backgroundColor: "#fff",
  },

  backButton: {
    backgroundColor: "#F2F5F9",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: "6%",
    marginLeft: "6%",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "3%",
    width: "100%",
    backgroundColor: "#FEEFD1",
  },
  paymentInfo: {
    color: "#C98C13",
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    height: undefined,
    resizeMode: "contain",
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
  },
  storeLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 12,
  },
  storeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  expiry_container: {
    width: "100%",
    height: "4%",
    flexDirection: "row",
    backgroundColor: "#168F55",
    justifyContent: "space-between",
  },

  expiry_date: {
    width: 150,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    color: "#168F55",
    borderRadius: 12,
    fontSize: 16,
    margin: 4,
    overflow: "hidden",
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },
  expiry_date_icon: {
    alignContent: "center",
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    margin: 4,
  },

  itemPriceContainer: {
    margin: 10,
  },

  itemQuantityContainer: {
    margin: 10,
  },

  productDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  seperator: {
    height: 1, // Height of the line
    backgroundColor: "#EEEEEE", // Color of the line
    width: "90%", // Full width of the container
    marginVertical: 10, // Margin around the line
  },
  descriptionHeaderContainer: {
    flexDirection: "row",
    width: "100%",
  },
  descriptionHeader: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "right",
    margin: 10,
  },

  itemQty: {
    fontSize: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  leftContainer: {
    backgroundColor: "#FBAF18",
    borderRadius: 4,
    margin: 4,
    padding: 4,
  },
  left: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  discountContainer: {
    backgroundColor: "#E52A34",
    borderRadius: 4,
    margin: 4,
    padding: 4,
  },
  discount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  rating: {
    fontSize: 20,
    color: "white",
    marginTop: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  originalPrice: {
    fontSize: 16,
    color: "#777",
    textDecorationLine: "line-through",
    marginTop: 5,
  },
  collectTime: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: "#888",
    margin: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export default ItemPage;
