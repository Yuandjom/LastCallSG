import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Store, StoreItem } from "@/app/interfaces";
import { truncateText } from "@/utils/truncateText";

interface StoreComponentProps {
  store: Store;
  allStores: Store[];
}

const StoreComponent: React.FC<StoreComponentProps> = ({ store, allStores }) => {
  const router = useRouter();

  const handleStorePress = () => {
    router.push({
      pathname: "/store",
      params: {
        items: JSON.stringify(allStores.find(s => s.storeTitle === store.storeTitle)?.items || store.items),
        store: JSON.stringify(allStores.find(s => s.storeTitle === store.storeTitle) || store),
      },
    });
  };

  const handleItemPress = (item: StoreItem) => {
    router.push({
      pathname: "/item",
      params: { item: JSON.stringify(item), store: JSON.stringify(store) },
    });
  };

  return (
    <View style={styles.storeContainer}>
      <TouchableOpacity
        onPress={handleStorePress}
        activeOpacity={0.6}
        delayPressIn={100}
      >
        <View style={styles.storeHeader}>
          <Image
            source={{ uri: store.storeLogo as any }}
            style={styles.storeLogo}
          />
          <View style={styles.storeInfo}>
            <Text style={styles.storeTitle}>
              {truncateText(store.storeTitle, 20)}
            </Text>
            <Text style={styles.storeSubtitle}>
              {store.storeDistance}
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={18} style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer} horizontal showsHorizontalScrollIndicator={false}>
        {store.items.filter(item => item.quantity > 0).map((item, index) => {
          let itemLeftStyle: any;
          let itemLeftTextColor: any;
          if (item.quantity === 1) {
            itemLeftStyle = styles.itemLeftRed;
            itemLeftTextColor = { color: "#B7222A" };
          } else if (item.quantity > 10) {
            itemLeftStyle = styles.itemLeftGreen;
            itemLeftTextColor = { color: "white" };
          } else {
            itemLeftStyle = styles.itemLeftDefault;
            itemLeftTextColor = { color: "#C98C13" };
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleItemPress(item)}
              activeOpacity={0.6}
              delayPressIn={60}
            >
              <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.imageURL }}
                    style={styles.itemImage}
                  />
                  <View style={styles.discountTag}>
                    <Text style={styles.discountText}>
                      -{item.discount * 100}%
                    </Text>
                  </View>
                </View>
                <View style={styles.itemInfo}>
                  <View style={[styles.itemLeftContainer, itemLeftStyle]}>
                  </View>
                  <Text style={styles.itemName}>
                    {truncateText(item.name, 25)}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.itemWasPrice}>
                      was {item.originalPrice}
                    </Text>
                    <Text style={styles.itemPrice}>
                      {item.finalPrice.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollContainer: {
    height: '100%',
    flexGrow: 1,
    alignItems: 'stretch',
  },
  storeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  storeLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  storeInfo: {
    flex: 1,
  },
  storeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  storeSubtitle: {
    fontSize: 14,
    color: "gray",
  },
  storeStatus: {
    backgroundColor: "#E9FAF2",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    width: 40,
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    color: "#56C071",
    fontWeight: "bold",
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: "gray",
  },
  itemContainer: {
    marginRight: 16,
    width: 150,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: "relative",
  },
  itemImage: {
    width: "100%",
    height: 100,
  },
  discountTag: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: 18,
    color: "white",
  },
  itemInfo: {
    padding: 8,
  },
  itemLeftContainer: {
    borderRadius: 4,
    marginBottom: 4,
    width: 50,
    alignItems: "center",
  },
  itemLeftRed: {
    backgroundColor: "#FCEAEB",
    borderColor: "#B7222A",
  },
  itemLeftGreen: {
    backgroundColor: "#56C071",
    borderColor: "darkgreen",
  },
  itemLeftDefault: {
    backgroundColor: "#FDEBD0",
    borderColor: "#FAD7A0",
  },
  itemLeft: {
    fontSize: 11,
    paddingHorizontal: 4,
    paddingVertical: 2,
    textAlign: "center",
    fontWeight: "medium",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5
  },
  itemPrice: {
    fontSize: 18,
    color: "#56C071",
    fontWeight: "bold",
  },
  itemWasPrice: {
    fontSize: 12,
    color: "gray",
    textDecorationLine: "line-through",
  },
});

export default StoreComponent;
