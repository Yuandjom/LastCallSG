import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Platform,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import CategoryScrollView from "@/components/category/Category";
import StoreComponent from "@/components/store/StoreComponent";
import { Store } from "@/app/interfaces";
import TopBar from "@/components/topbar/TopBar";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoaded, setInitialLoaded] = useState<boolean>(false); // Track initial load
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStores().finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await fetch(
        "https://411r12agye.execute-api.ap-southeast-1.amazonaws.com/stores"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stores");
      }
      const data = await response.json();
      setStores(data.sort((a, b) => b.id - a.id));
      setFilteredStores(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      setInitialLoaded(true); // Mark initial load as complete
    }
  };
  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setFilteredStores(stores);
    } else {
      setSelectedCategory(category);
      setFilteredStores(
        stores.filter((store) => store.storeCategory === category)
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TopBar stores={stores}></TopBar>
      {/* <CategoryScrollView
        selectedCategory={selectedCategory}
        onCategoryPress={handleCategoryPress}
      /> */}
      <View style={styles.bottomBar}>
        <Image
          source={{
            uri: "https://walaoeh.s3.ap-southeast-1.amazonaws.com/homeBannerIcon.png",
          }}
          style={styles.bottomBarImage}
        />
        <Text style={styles.bottomBarText}>
          👋 {100} KG of food waste prevented to date
        </Text>
      </View>
      {loading && !initialLoaded ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredStores.map((store: Store, index: number) => (
            <StoreComponent key={index} store={store} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  storeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  storeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  storeSubtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 16,
  },
  itemContainer: {
    marginRight: 16,
    width: 150,
  },
  itemImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#56C071",
    marginBottom: 4,
  },
  itemWasPrice: {
    fontSize: 12,
    color: "gray",
    textDecorationLine: "line-through",
    marginBottom: 4,
  },
  itemLeft: {
    fontSize: 12,
    color: "red",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#e0f7fa",
    borderTopWidth: 1,
    borderColor: "#cfd8dc",
  },
  bottomBarImage: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  bottomBarText: {
    fontSize: 14,
    color: "#00796b",
    fontWeight: "bold",
  },
});
