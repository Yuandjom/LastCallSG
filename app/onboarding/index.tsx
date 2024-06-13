import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const OnboardingScreen1 = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icons/lastcall.png')} style={styles.image} />
            <Text style={styles.title}>What is LastCall SG?</Text>
            <Text style={styles.description}>
                LastCall SG is an online marketplace that aggregates soon-to-expire food items from grocery retailers.
            </Text>
            <Text style={styles.description}>
                Community members can browse and reserve these best-before-date products at heavily discounted prices, helping to reduce food waste.
            </Text>
            <Text style={styles.subtitle}>Vision:</Text>
            <Text style={styles.description}>To become the go-to platform for minimizing food waste from online grocery channels.</Text>
            <Text style={styles.subtitle}>Mission:</Text>
            <Text style={styles.description}>To collaborate with online grocery retailers and enable them to achieve zero food waste.</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding/second')}>
                <Text style={styles.buttonText}>Start Tour!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'left',
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'left',
    },
    button: {
        backgroundColor: '#4285F4',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OnboardingScreen1;
