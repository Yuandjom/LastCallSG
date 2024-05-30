import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const items = [
    { name: 'Barbeque Smoked Beef Steak', price: '$1.99', wasPrice: '$4.50', left: 2, image: require('@/assets/store/beef.png') },
    { name: 'Baked Cheese and Veggie', price: '$4.99', wasPrice: '$5.80', left: 1, image: require('@/assets/store/cheese.png') },
    { name: 'Honey Glazed Salmon', price: '$4.50', wasPrice: '$4.50', left: 6, image: require('@/assets/store/salmon.png') },
];
const StoreComponent = () => {
    const handleStorePress = () => {
        Alert.alert('Store clicked', 'You clicked the store header!');
    };

    const handleItemPress = (item: { name: any; price?: string; wasPrice?: string; left?: number; image?: any; }) => {
        Alert.alert('Item clicked', `You clicked on ${item.name}`);
    };

    return (
        <View style={styles.storeContainer}>
            <TouchableOpacity onPress={handleStorePress} activeOpacity={0.6} delayPressIn={100}>
                <View style={styles.storeHeader}>
                    <Image source={require('@/assets/icons/starbucks.png')} style={styles.storeLogo} />
                    <View style={styles.storeInfo}>
                        <Text style={styles.storeTitle}>Starbucks Coffee</Text>
                        <Text style={styles.storeSubtitle}>2.5km • Grocery Store</Text>
                    </View>
                    <View style={styles.storeStatus}>
                        <Text style={styles.statusText}>16</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} style={styles.arrowIcon} />
                </View>
            </TouchableOpacity>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {items.map((item, index) => {
                    let itemLeftStyle;
                    if (item.left === 1) {
                        itemLeftStyle = styles.itemLeftRed;
                    } else if (item.left > 10) {
                        itemLeftStyle = styles.itemLeftGreen;
                    } else {
                        itemLeftStyle = styles.itemLeftDefault;
                    }

                    return (
                        <TouchableOpacity key={index} onPress={() => handleItemPress(item)} activeOpacity={0.6} delayPressIn={60}>
                            <View style={styles.itemContainer}>
                                <View style={styles.imageContainer}>
                                    <Image source={item.image} style={styles.itemImage} />
                                    <View style={styles.discountTag}>
                                        <Text style={styles.discountText}>-10%</Text>
                                    </View>
                                </View>
                                <View style={styles.itemInfo}>
                                    <View style={[styles.itemLeftContainer, itemLeftStyle]}>
                                        <Text style={styles.itemLeft}>{item.left} left</Text>
                                    </View>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.itemWasPrice}>was {item.wasPrice}</Text>
                                        <Text style={styles.itemPrice}>{item.price}</Text>
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
        paddingVertical: 16,
    },
    storeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    storeLogo: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 8,
    },
    storeInfo: {
        flex: 1,
    },
    storeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    storeSubtitle: {
        fontSize: 14,
        color: 'gray',
    },
    storeStatus: {
        backgroundColor: '#E9FAF2',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 8,
        width: 40,
        alignItems: 'center',
    },
    statusText: {
        fontSize: 12,
        color: '#168F55',
        fontWeight: 'bold',
    },
    arrowIcon: {
        width: 20,
        height: 20,
        tintColor: 'gray',
    },
    itemContainer: {
        marginRight: 16,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        position: 'relative',
    },
    itemImage: {
        width: '100%',
        height: 100,
    },
    discountTag: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    discountText: {
        fontSize: 12,
        color: 'white',
    },
    itemInfo: {
        padding: 8,
    },

    itemLeftContainer: {
        borderRadius: 4,
        marginBottom: 4,
        width: 40,
        alignItems: 'center',
    },
    itemLeftRed: {
        backgroundColor: '#FCEAEB',
        borderColor: '#B7222A',
    },
    itemLeftGreen: {
        backgroundColor: 'green',
        borderColor: 'darkgreen',
    },
    itemLeftDefault: {
        backgroundColor: '#FDEBD0',
        borderColor: '#FAD7A0',
    },
    itemLeft: {
        fontSize: 11,
        color: '#C98C13',
        paddingHorizontal: 4,
        paddingVertical: 2,
        textAlign: 'center',
        fontWeight: 'medium',
    },
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
    },
    itemWasPrice: {
        fontSize: 12,
        color: 'gray',
        textDecorationLine: 'line-through',
    },
});

export default StoreComponent;
