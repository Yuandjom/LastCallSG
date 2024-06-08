import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { categories } from '@/mocks/mockCategories';

const CategoryScrollView = () => {
    const handleCategoryPress = (category: { name: any; image?: any; }) => {
        Alert.alert('Category clicked', `You clicked on ${category.name}`);
    };

    return (
        <View style={styles.categoryScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleCategoryPress(category)}
                        activeOpacity={0.6}
                        delayPressIn={100}
                    >
                        <View style={styles.categoryContainer}>
                            <View style={styles.imageContainer}>
                                <Image source={category.image} style={styles.categoryImage} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.categoryText}>{category.name}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
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
