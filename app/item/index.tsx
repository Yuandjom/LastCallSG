import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ItemPage = () => {
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item as string) : null;

  return (
    <View style={styles.container}>
      {item ? (
        <>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemName}>Left: {item.left}</Text>
        </>
      ) : (
        <Text style={styles.errorText}>No item data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  itemName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default ItemPage;
