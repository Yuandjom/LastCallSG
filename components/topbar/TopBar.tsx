import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, Circle } from "react-native-maps";

const TopBar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const userLocation = { latitude: 1.2931, longitude: 103.8496 }; // Dummy user location
  const storeLocation = { latitude: 1.2931, longitude: 103.8496 }; // Dummy store location

  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
        <Text style={styles.locationSubText}>Current location · 50 km</Text>
        <Ionicons
          name="information-circle-outline"
          size={30}
          style={styles.infoIcon}
        />
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
            <Marker
              coordinate={storeLocation}
              title="Store Location"
              description="Store address"
            />
            <Marker
              coordinate={userLocation}
              title="Your Location"
              pinColor="blue"
            />
            <Circle
              center={userLocation}
              radius={5000} // Radius in meters
              strokeColor="rgba(0,0,255,0.5)"
              fillColor="rgba(0,0,255,0.1)"
            />
          </MapView>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
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
    color: "gray",
    position: "absolute",
    right: 20,
    top: 50,
  },
  chevronIcon: {
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
  },
  closeButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default TopBar;
