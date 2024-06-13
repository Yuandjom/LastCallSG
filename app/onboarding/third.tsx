import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router, useRouter } from 'expo-router';

const OnboardingScreen3 = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Key Features</Text>
                <TouchableOpacity onPress={() => router.push('(tabs)')}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>
            <Image source={require('../../assets/icons/chope.png')} style={styles.image} />
            <Text style={styles.title}>Chope -</Text>
            <Text style={styles.description}>
                Chope your chosen discounted items with just a few clicks.
            </Text>
            <TouchableOpacity style={styles.continueButton} onPress={() => router.push('/onboarding/fourth')}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FBAF18',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 70,
        left: 20,
        paddingHorizontal: 20,

    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    skipText: {
        fontSize: 16,
        color: 'white',
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
        color: 'white',
        alignSelf: 'center',
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    continueButton: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    continueButtonText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default OnboardingScreen3;
