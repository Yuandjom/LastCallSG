// app/ComingSoon.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ComingSoon = () => {
  const router = useRouter();
  const { feature } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://walaoeh.s3.ap-southeast-1.amazonaws.com/onBoardingSecond.png" }}
        style={styles.image}
      />
      <Text style={styles.text}>"{feature}" is currently not available.</Text>
      <Text style={styles.text}>We will inform you when it is available!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>Click here to continue browsing</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgba(22, 143, 85, 1)",
    borderRadius: 32,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ComingSoon;
