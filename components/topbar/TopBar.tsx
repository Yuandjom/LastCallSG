import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import MapModal from "./mapmodal/MapModal"; // Import the new MapModal component
import { Store } from "@/app/interfaces";

interface TopBarProps {
  stores: Store[];
}

const TopBar: React.FC<TopBarProps> = ({ stores }) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handlePress = () => {
    console.log(JSON.stringify(stores));
    router.push({
      pathname: "/searchbar/Search", // Navigate to the SearchScreen
      params: { stores: JSON.stringify(stores) }, // Pass the filtered stores as a parameter
    });
  };

  return (
    <View>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={toggleModal}
          style={styles.locationContainer}
        >
          <Ionicons name="location-outline" size={18} />
          <Text style={styles.locationText}>SMU Yong Pung How</Text>
          <Ionicons name="chevron-down" size={18} style={styles.chevronIcon} />
        </TouchableOpacity>
        <Text style={styles.locationSubText}>Current location</Text>
        <TouchableOpacity onPress={handlePress} style={styles.infoIcon}>
          <Ionicons name="search-outline" size={30} color="gray" />
        </TouchableOpacity>
      </View>

      <MapModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        filteredStores={stores}
      />
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
});

export default TopBar;
