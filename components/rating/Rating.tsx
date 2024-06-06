import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Rating = ({ route, navigation }) => {
    const { order } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="close" size={24} color="#000" />
                </TouchableOpacity>
                <Image source={require("@/assets/icons/starbucks.png")} style={styles.shopImage} />
                <TouchableOpacity>
                    <FontAwesome name="flag" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>How was {order.shop}?</Text>
            <Text style={styles.subtitle}>They'll get your feedback, what did you enjoy?</Text>
            <View style={styles.starsContainer}>
                {[...Array(5)].map((_, i) => (
                    <FontAwesome key={i} name="star" size={30} color="#ccc" />
                ))}
            </View>
            <TextInput
                style={styles.textInput}
                placeholder="Tell us more (optional)"
                multiline
            />
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Rating;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    shopImage: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    textInput: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
