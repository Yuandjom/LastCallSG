import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';

//move to components folder
const categories = [
    { name: 'Hawker Store', image: require('@/assets/category/hawkerstore.png') },
    { name: 'Cafe', image: require('@/assets/category/cafe.png') },
    { name: 'Mini Mart', image: require('@/assets/category/minimart.png') },
    { name: 'Super Market', image: require('@/assets/category/supermarket.png') },
    { name: 'Grocery Store', image: require('@/assets/category/grocerystore.png') },
    { name: 'Bakery', image: require('@/assets/images/minibun.jpg') },
];

const CategoryScrollView = () => {
    return (
        <View style={styles.categoryScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category, index) => (
                    <View key={index} style={styles.categoryContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={category.image} style={styles.categoryImage} />
                            <View style={styles.textContainer}>
                                <Text style={styles.categoryText}>{category.name}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryScroll: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    categoryContainer: {
        alignItems: 'center',
        marginRight: 16,
    },
    imageContainer: {
        position: 'relative',
        width: 70,
        height: 70,
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    categoryText: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default CategoryScrollView;
