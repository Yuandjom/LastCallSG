import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Modal,
  Dimensions,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, Circle } from "react-native-maps";
import { useRouter } from "expo-router";

const TopBar = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const userLocation = { latitude: 1.296568, longitude: 103.852119 }; // Dummy user location
  const lastTapRef = useRef(null); // Reference to store last tap time

  const stores = [
    {
      latitude: 1.2956,
      longitude: 103.8583,
      title: "Store Location 1",
      description: "Store address 1",
      address: "51 Bras Basah Rd, #04-08 Lazada One",
    },
    {
      latitude: 1.3,
      longitude: 103.85,
      title: "Store Location 2",
      description: "Store address 2",
      address: "123 Orchard Rd, #01-01",
    },
    {
      latitude: 1.31,
      longitude: 103.86,
      title: "Store Location 3",
      description: "Store address 3",
      address: "456 Marina Bay, #02-02",
    },
    {
      latitude: 1.4376,
      longitude: 103.8376,
      title: "Philip's Market",
      description:
        "Philip's market is a market place providing everyday essentials...",
      address:
        "7 YISHUN INDUSTRIAL STREET 1, BIZHUB, #03-50 NORTH SPRING, 768162",
    },
    {
      latitude: 1.31,
      longitude: 103.86,
      title: "Store Location 3",
      description: "Store address 3",
      address: "456 Marina Bay, #02-02",
    },
  ];

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handlePress = () => {
    router.push({
      pathname: "/onboarding",
    });
  };

  const handleMarkerPress = (address:any) => {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < 1000) {
      // Double tap detected
      const query = encodeURIComponent(address);
      const url = `https://www.google.com/search?q=${query}`;
      Linking.openURL(url);
    } else {
      lastTapRef.current = now;
    }
  };

  return (
    <View>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={toggleModal}
          style={styles.locationContainer}
        >
          <Ionicons name="location-outline" size={18} />
          <Text style={styles.locationText}>Your Location</Text>
          <Ionicons name="chevron-down" size={18} style={styles.chevronIcon} />
        </TouchableOpacity>
        <Text style={styles.locationSubText}>Current location · 500m</Text>
        <TouchableOpacity onPress={handlePress} style={styles.infoIcon}>
          <Ionicons name="information-circle-outline" size={30} color="gray" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {stores.map((store, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: store.latitude,
                  longitude: store.longitude,
                }}
                title={store.title}
                description={store.description}
                onPress={() => handleMarkerPress(store.address)}
              >
                <View style={styles.markerContainer}>
                  <Ionicons name="storefront-outline" size={24} color="white" />
                  <Text style={styles.markerLabel}>{store.title}</Text>
                </View>
              </Marker>
            ))}
            <Marker
              coordinate={userLocation}
              title="Your Location"
              pinColor="#474744"
            >
              <View style={styles.markerContainer}>
                <Ionicons name="person-circle-outline" size={24} color="red" />
                <Text style={styles.markerLabel}>You</Text>
              </View>
            </Marker>
            <Circle
              center={userLocation}
              radius={5000} // Radius in meters
              strokeColor="rgba(0,255,255,0.5)"
              fillColor="rgba(0,255,255,0.1)"
            />
          </MapView>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "column",
    justifyContent: "space-between",
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
  locationSubText: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },
  infoIcon: {
    position: "absolute",
    right: 20,
    top: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
  },
  chevronIcon: {
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 10,
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerLabel: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TopBar;
