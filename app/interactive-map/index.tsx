import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const InteractiveMapScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const storeLocation = JSON.parse(params.storeLocation as string);
  const userLocation = JSON.parse(params.userLocation as string);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Maps</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: storeLocation.latitude,
          longitude: storeLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={storeLocation}
          title="Starbucks Coffee"
          description="3 Sin Ming Walk, Singapura 575575"
        />
        <Marker
          coordinate={userLocation}
          title="Your Location"
          pinColor="blue"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: Platform.OS === "android" ? StatusBar.currentHeight : 50,
    zIndex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default InteractiveMapScreen;
