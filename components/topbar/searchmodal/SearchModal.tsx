import React, { useState } from "react";
import {
    Modal,
    View,
    TextInput,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
} from "react-native";
import { Store } from "@/app/interfaces";

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
        }
        toggleModal();
        Keyboard.dismiss();
    };

    const boldSearchQuery = (text: string, query: string) => {
        if (!query) return text;

        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <Text key={index} style={{ fontWeight: 'bold' }}>
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
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search items..."
                        placeholderTextColor="#888" // Adjust color as needed
                        value={searchQuery}
                        onChangeText={handleSearch}
                        onSubmitEditing={handleSubmit}
                    />
                    <FlatList
                        data={filteredResults}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.storeContainer}>
                                <FlatList
                                    data={item.items.filter((item) =>
                                        item.name.toLowerCase().includes(searchQuery.toLowerCase())
                                    )}
                                    keyExtractor={(item) => item.name}
                                    renderItem={({ item }) => (
                                        <Text style={styles.storeName}>
                                            {boldSearchQuery(item.name, searchQuery)}
                                        </Text>
                                    )}
                                />
                            </View>
                        )}
                        style={styles.resultsList}
                    />
                    <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    searchBar: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
        fontSize: 16, // Increase font size for better visibility
        color: "#000", // Ensure text color is visible
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
});

export default SearchModal;
