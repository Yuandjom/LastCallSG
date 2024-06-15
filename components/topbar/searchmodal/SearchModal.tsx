import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Store } from "@/app/interfaces";
import { Ionicons } from "@expo/vector-icons";

interface SearchModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
  stores: Store[];
  onSearchSubmit: (query: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  modalVisible,
  toggleModal,
  stores,
  onSearchSubmit,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSubmit = () => {
    if (searchQuery.trim() !== "") {
      onSearchSubmit(searchQuery);
    } else {
      onSearchSubmit("");
    }
    toggleModal();
    Keyboard.dismiss();
  };

  const handleItemPress = (itemName: string) => {
    onSearchSubmit(itemName);
    toggleModal();
    Keyboard.dismiss();
  };

  const boldSearchQuery = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} style={{ fontWeight: "bold" }}>
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  const filteredResults = searchQuery.trim()
    ? stores.filter((store) =>
        store.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.searchBarContainer}>
              <TextInput
                style={styles.searchBar}
                placeholder="Search items..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={handleSearch}
                onSubmitEditing={handleSubmit}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery("")}
                  style={styles.clearButton}
                >
                  <Ionicons name="close-circle" size={20} color="#888" />
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              data={filteredResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.storeContainer}>
                  <FlatList
                    data={item.items.filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleItemPress(item.name)}
                      >
                        <Text style={styles.storeName}>
                          {boldSearchQuery(item.name, searchQuery)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
              style={styles.resultsList}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSubmit}
              >
                <Ionicons
                  name="search-outline"
                  size={24}
                  color="rgba(22, 143, 85, 1)"
                  style={styles.buttonIcon}
                />
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.payButton}
                onPress={toggleModal}
              >
                <Ionicons
                  name="close-outline"
                  size={24}
                  color="#fff"
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    fontSize: 16,
    color: "#000",
  },
  clearButton: {
    paddingRight: 8,
  },
  resultsList: {
    flex: 1,
    width: "100%",
  },
  storeContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  storeName: {
    fontSize: 16,
  },
  itemName: {
    fontSize: 14,
    color: "#666",
    marginLeft: 16,
  },

  closeButton: {
    width: "100%",
    padding: 8,
    backgroundColor: "#2196F3",
    borderRadius: 4,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  searchButton: {
    borderColor: "rgba(22, 143, 85, 1)",
    borderWidth: 1.5,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "rgba(22, 143, 85, 1)",
    fontSize: 16,
    fontWeight: "700",
  },
  payButton: {
    backgroundColor: "rgba(22, 143, 85, 1)",
    borderRadius: 32,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  navigateButtonText: {
    color: "rgba(22, 143, 85, 1)",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default SearchModal;
