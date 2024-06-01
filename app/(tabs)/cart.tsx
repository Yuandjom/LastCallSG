import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Cart = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity> */}
                <Text style={styles.headerText}>Cart</Text>
                <Text style={styles.headerItemCount}>0 item</Text>
            </View>
            <View style={styles.content}>
                <Image
                    source={{ uri: 'https://img.icons8.com/ios/452/shopping-cart.png' }}
                    style={styles.cartImage}
                />
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
                <Text style={styles.subText}>Once you add items from restaurant, your cart will appear here</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Start Shopping</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginTop: 20, // Adjust this value to move the header lower
        paddingTop: 20,
    },
    backButton: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10, // Adjust this value to add spacing between header text and top
    },
    headerItemCount: {
        fontSize: 14,
        color: '#888',
        marginTop: 5, // Adjust this value to add spacing between header text and item count
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    cartImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    emptyCartText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25, // Make the button more rounded
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
