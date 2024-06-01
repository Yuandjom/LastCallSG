import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ItemPage = () => {
  const params = useLocalSearchParams();

  // const item = params.item ? JSON.parse(params.item as string) : {
  //   name: "Bag of Breads",
  //   left: 2,
  //   discount: "-10%",
  //   rating: 4.8,
  //   collectTime: "19:00 - 22:00",
  //   price: "$7.99",
  //   originalPrice: "$8.00",
  //   description: "A bag of bread, contains 6-7 bread. Please collect before closing at 9PM."
  // }; // Added mock data for styling purposes

  const item = {
    name: "Bag of Breads",
    left: 2,
    discount: "-10%",
    rating: 4.8,
    collectTime: "19:00 - 22:00",
    price: "$7.99",
    originalPrice: "$8.00",
    description: "A bag of bread, contains 6-7 bread. Please collect before closing at 9PM."
  }; // Added mock data for styling purposes

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/minibun.jpg')} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.discount}>{item.discount}</Text>
      <Text style={styles.rating}>{`${item.rating} ★`}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.originalPrice}>{item.originalPrice}</Text>
      <Text style={styles.collectTime}>{item.collectTime}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Chope Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  discount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    color: "#444",
    marginTop: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  originalPrice: {
    fontSize: 18,
    color: "#777",
    textDecorationLine: "line-through",
    marginTop: 5,
  },
  collectTime: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export default ItemPage;
