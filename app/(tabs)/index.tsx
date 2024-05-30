import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryScrollView from '@/components/category/Category';
import StoreComponent from '@/components/store/StoreComponent';



export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topBar}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={18} />
          <Text style={styles.locationText}>Your Location</Text>
          <Ionicons name="chevron-down" size={18} style={styles.chevronIcon} />
        </View>
        <Text style={styles.locationSubText}>Current location · 50 km</Text>
        <Ionicons name="information-circle-outline" size={30} style={styles.infoIcon} />
      </View>

      <ScrollView style={styles.scrollView}>
        <CategoryScrollView></CategoryScrollView>
        <StoreComponent></StoreComponent>
        <StoreComponent></StoreComponent>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  topBar: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationSubText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  infoIcon: {
    color: 'gray',
    position: 'absolute',
    right: 20,
    top: 50,
  },
  chevronIcon: {
    marginLeft: 4,
  },
  storeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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
