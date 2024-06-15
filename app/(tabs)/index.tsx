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
import StoreComponent from "@/components/store/StoreComponent";
import { Store } from "@/app/interfaces";
import TopBar from "@/components/topbar/TopBar";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoaded, setInitialLoaded] = useState<boolean>(false);

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
      setInitialLoaded(true);
    }
  };

  const handleSearchSubmit = (query: string) => {
    const results = stores.filter((store) =>
      store.items.some((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredStores(results);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TopBar stores={stores} onSearchSubmit={handleSearchSubmit} />
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
