import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";

const OrderConfirmation = () => {
    const router = useRouter();
    const handlePress = () => {
        // Add your code here
        router.push({
            pathname: "/",
            params: {
            },
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.checkmarkContainer}>
                    <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.checkmark} />
                </View>
                <Text style={styles.message}>We have chopped your order!</Text>
                <Text style={styles.amount}>S$15.98</Text>
                <View style={styles.orderContainer}>
                    <Image style={styles.marketLogo} source={{ uri: 'https://via.placeholder.com/100' }} />
                    <Text style={styles.marketName}>Philip's Market</Text>
                    <View style={styles.orderDetails}>
                        <Text style={styles.label}>Order ID:</Text>
                        <Text style={styles.value}>O-125675</Text>
                    </View>
                    <View style={styles.orderDetails}>
                        <Text style={styles.label}>Date:</Text>
                        <Text style={styles.value}>18 Jun 2022 at 10:15 pm</Text>
                    </View>
                    <Text style={styles.itemLabel}>ITEM</Text>
                    <View style={styles.orderDetails}>
                        <Text style={styles.item}>1x Double Cheeseburger</Text>
                        <Text style={styles.value}>S$4.99</Text>
                    </View>
                    <View style={styles.orderDetails}>
                        <Text style={styles.item}>2x Bag of Breads</Text>
                        <Text style={styles.value}>S$2.99</Text>
                    </View>
                    <View style={styles.orderDetails}>
                        <Text style={styles.totallabel}>Total:</Text>
                        <Text style={styles.totalValue}>S$7.98</Text>
                    </View>
                    <Text style={styles.note}>
                        Please collect your order within 7 days. You can pay for your purchase at the store counter. A confirmation email has been sent to your email address.
                    </Text>
                </View>
                <TouchableOpacity style={styles.button2} onPress={() => handlePress()}>
                    <Text style={styles.buttonText2}>View order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e9f6f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    checkmarkContainer: {
        backgroundColor: '#d4edda',
        borderRadius: 50,
        padding: 10,
        marginBottom: 10,
    },
    checkmark: {
        width: 40,
        height: 40,
    },
    message: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#28a745',
    },
    amount: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    orderContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    marketLogo: {
        width: 100,
        height: 50,
        marginBottom: 10,
    },
    marketName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    value: {
        fontSize: 14,
        color: '#000',
    },
    //need to remake
    itemLabel: {
        fontSize: 12,
        color: 'gray',
        width: '100%',
        textAlign: 'left',
        right: 140,
        marginBottom: 5,
    },
    itemsContainer: {
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 10,
    },
    item: {
        fontSize: 14,
        fontWeight: 'bold',

    },
    totallabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
    totalValue: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#28a745',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        marginVertical: 10,
    },
    note: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#28a745',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 50,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    button2: {
        backgroundColor: '#28a745',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 50,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    link: {
        fontSize: 16,
        color: '#28a745',
        textDecorationLine: 'underline',
    },
    buttonText2: {
        color: '#fff',
        fontSize: 18,
    },
});

export default OrderConfirmation;
