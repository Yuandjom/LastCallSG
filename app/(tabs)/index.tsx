import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.locationText}>Your Location</Text>
        <Text style={styles.locationSubText}>Current location: 50 km</Text>
        <View style={styles.categoryScroll}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Hawker Store', 'Cafe', 'Mini Mart', 'Super Market', 'Grocery Store', 'Bakery'].map(
              (category, index) => (
                <View key={index} style={styles.categoryContainer}>
                  <Image
                    source={require('@/assets/images/minibun.jpg')} // Placeholder image, replace with actual category images
                    style={styles.categoryImage}
                  />
                  <Text style={styles.categoryText}>{category}</Text>
                </View>
              )
            )}
          </ScrollView>
        </View>
      </View>

      <View style={styles.storeContainer}>
        <Text style={styles.storeTitle}>Starbucks Coffee</Text>
        <Text style={styles.storeSubtitle}>2.5km • Grocery Store</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { name: 'Barbeque Smoked Beef Steak', price: '$1.99', wasPrice: '$4.50', left: 2 },
            { name: 'Baked Cheese and Veggie', price: '$4.99', wasPrice: '$5.80', left: 1 },
            { name: 'Honey Glazed Salmon', price: '$4.50', wasPrice: '$4.50', left: 6 },
          ].map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image
                source={require('@/assets/images/minibun.jpg')} // Placeholder image, replace with actual item images
                style={styles.itemImage}
              />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Text style={styles.itemWasPrice}>was {item.wasPrice}</Text>
              <Text style={styles.itemLeft}>{item.left} left</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationSubText: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 16,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
  },
  storeContainer: {
    padding: 16,
  },
  storeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  storeSubtitle: {
    fontSize: 14,
    color: 'gray',
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
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: 'green',
    marginBottom: 4,
  },
  itemWasPrice: {
    fontSize: 12,
    color: 'gray',
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  itemLeft: {
    fontSize: 12,
    color: 'red',
  },
});
