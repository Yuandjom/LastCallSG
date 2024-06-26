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
import MapModal from "./mapmodal/MapModal";
import SearchModal from "./searchmodal/SearchModal";
import { Store } from "@/app/interfaces";

interface TopBarProps {
  stores: Store[];
  onSearchSubmit: (query: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ stores, onSearchSubmit }) => {
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const toggleMapModal = () => {
    setMapModalVisible(!mapModalVisible);
  };

  const toggleSearchModal = () => {
    setSearchModalVisible(!searchModalVisible);
  };

  return (
    <View>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={toggleMapModal}
          style={styles.locationContainer}
        >
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={18} />
            <Text style={styles.locationText}> SMU Yong Pung How</Text>
            <Ionicons
              name="chevron-down"
              size={18}
              style={styles.chevronIcon}
            />
          </View>
          <Text style={styles.locationSubText}>Find nearby stores</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSearchModal} style={styles.infoIcon}>
          <Ionicons name="search-outline" size={30} color="gray" />
        </TouchableOpacity>
      </View>

      <MapModal
        modalVisible={mapModalVisible}
        toggleModal={toggleMapModal}
        filteredStores={stores}
      />

      <SearchModal
        modalVisible={searchModalVisible}
        toggleModal={toggleSearchModal}
        stores={stores}
        onSearchSubmit={onSearchSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 55,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationContainer: {
    alignItems: "center",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  locationSubText: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
    textAlign: "center",
  },
  infoIcon: {
    position: "absolute",
    right: 20,
    top: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 55,
  },
  chevronIcon: {
    marginLeft: 4,
  },
});

export default TopBar;
