import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

interface Item {
    expiryDate: string;
    quantity: number;
    originalPrice: number;
    imageURL: string;
    name: string;
    description: string;
    discount: number;
    finalPrice: number;
    weight: number;
}

interface Store {
    id: string;
    storeTitle: string;
    storePostalCode: string;
    storeItemQuantity: number;
    storeRating: number;
    items: Item[];
    storeCategory: string;
    storeLatitude: number;
    storeLogo: string;
    storeDistance: string;
    storeLongitude: number;
    storeAddress: string;
    storeEmailAddress: string;
    distanceFromCurrentLocation: number;
}

interface SearchScreenProps {
    stores: Store[];
}

const SearchScreen: React.FC = () => {
    const { stores } = useLocalSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredStores, setFilteredStores] = useState<Store[]>([]);

    useEffect(() => {
        if (stores) {
            setFilteredStores(JSON.parse(stores as string));
        }
    }, [stores]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredResults = filteredStores.filter((store) =>
        store.items.some((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const handleStorePress = (store: Store) => {
        router.push({
            pathname: "/store-details",
            params: { storeId: store.id },
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search items..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleStorePress(item)}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemName}>{item.storeTitle}</Text>
                            <FlatList
                                data={item.items.filter((item) =>
                                    item.name
                                        .toLowerCase()
                                        .includes(searchQuery.toLowerCase())
                                )}
                                keyExtractor={(item) => item.name}
                                renderItem={({ item }) => (
                                    <Text style={styles.storeName}>
                                        {item.name}
                                    </Text>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        top: 50,
        backgroundColor: "#fff",
    },
    searchBar: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    storeName: {
        fontSize: 14,
        color: "#666",
    },
});

export default SearchScreen;
