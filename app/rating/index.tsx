import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const Rating = () => {
    const params = useLocalSearchParams();
    const order = params.order ? JSON.parse(params.order as string) : { shop: 'Starbucks' };
    const navigation = useNavigation();

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleStarPress = (index: number) => {
        setRating(index + 1);
    };

    const handleSubmit = () => {
        // Handle the submit action here, like sending the review to the server.
        navigation.goBack();  // Navigate back to the previous page, presumably the orders page.
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome name="close" size={24} color="#000" />
                    </TouchableOpacity>
                    <Image source={require('../../assets/icons/starbucks.png')} style={styles.shopImage} />
                    <TouchableOpacity>
                        <FontAwesome name="flag" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>How was {order.shop}?</Text>
                <Text style={styles.subtitle}>They'll get your feedback, what did you enjoy?</Text>
                <View style={styles.starsContainer}>
                    {[...Array(5)].map((_, i) => (
                        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
                            <FontAwesome name="star" size={30} color={i < rating ? '#f0c30f' : '#ccc'} />
                        </TouchableOpacity>
                    ))}
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Tell us more (optional)"
                    multiline
                    value={review}
                    onChangeText={setReview}
                    onBlur={Keyboard.dismiss}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Rating;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        // justifyContent: 'center',
        padding: 20,
        top: 40,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    shopImage: {
        width: 60,
        height: 60,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
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
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
