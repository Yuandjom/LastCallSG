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
import MapView, { Marker, Circle, Callout } from "react-native-maps";
import { useRouter } from "expo-router";
import { Store } from "@/app/interfaces";

interface TopBarProps {
  filteredStores: Store[];
}

const TopBar: React.FC<TopBarProps> = ({ filteredStores }) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const userLocation = { latitude: 1.296568, longitude: 103.852119 }; // Dummy user location
  const lastTapRef = useRef(null); // Reference to store last tap time

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handlePress = () => {
    router.push({
      pathname: "/onboarding",
    });
  };

  const handleMarkerPress = (
    address: any,
    latitude: number,
    longitude: number
  ) => {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < 1000) {
      // Double tap detected
      if (Platform.OS === "ios") {
        // Open in Google Maps app or browser on iOS
        const url = `comgooglemaps://?q=${address}&center=${latitude},${longitude}`;
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
            );
          }
        });
      } else {
        // Open in Google Maps app or browser on Android
        const url = `geo:${latitude},${longitude}?q=${address}`;
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
            );
          }
        });
      }
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
            {filteredStores.map((store, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: store.storeLatitude,
                  longitude: store.storeLongitude,
                }}
                onPress={() =>
                  handleMarkerPress(
                    store.storeAddress,
                    store.storeLatitude,
                    store.storeLongitude
                  )
                }
              >
                <View style={styles.markerContainer}>
                  <Ionicons name="storefront-outline" size={24} color="white" />
                  <Text style={styles.markerLabel}>{store.storeTitle}</Text>
                </View>
                <Callout>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{store.storeTitle}</Text>
                    <Text style={styles.calloutDescription}>
                      {store.storeAddress}
                    </Text>
                  </View>
                </Callout>
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
  calloutContainer: {
    width: 150,
    padding: 5,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calloutDescription: {
    fontSize: 14,
    color: "gray",
  },
});

export default TopBar;
