import React, { useRef } from "react";
import {
    View,
    StyleSheet,
    Modal,
    Dimensions,
    TouchableOpacity,
    Platform,
    Linking,
    Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, Circle, Callout } from "react-native-maps";
import { Store } from "@/app/interfaces";

interface MapModalProps {
    modalVisible: boolean;
    toggleModal: () => void;
    filteredStores: Store[];
}

const MapModal: React.FC<MapModalProps> = ({
    modalVisible,
    toggleModal,
    filteredStores,
}) => {
    const userLocation = { latitude: 1.29508, longitude: 103.848953 }; // Dummy user location
    const lastTapRef = useRef(null); // Reference to store last tap time

    const handleMarkerPress = (
        address: any,
        latitude: number,
        longitude: number
    ) => {
        const now = Date.now();
        if (lastTapRef.current) {
            // Double tap detected
            if (Platform.OS === "ios") {
                // Open in Google Maps app or browser on iOS
                const url = `comgooglemaps://?q=${address}&center=${latitude},${longitude}`;
                Linking.canOpenURL(url).then((supported) => {
                    if (supported) {
                        Linking.openURL(url);
                    } else {
                        Linking.openURL(
                            `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
                        );
                    }
                });
            } else {
                // Open in Google Maps app or browser on Android
                const url = `geo:${latitude},${longitude}?q=${address}`;
                Linking.canOpenURL(url).then((supported) => {
                    if (supported) {
                        Linking.openURL(url);
                    } else {
                        Linking.openURL(
                            `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
                        );
                    }
                });
            }
        } else {
            lastTapRef.current = now;
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
        >
            <View style={styles.modalContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {filteredStores.map((store, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: store.storeLatitude,
                                longitude: store.storeLongitude,
                            }}
                            onPress={() =>
                                handleMarkerPress(
                                    store.storeAddress,
                                    store.storeLatitude,
                                    store.storeLongitude
                                )
                            }
                        >
                            <View style={styles.markerContainer}>
                                <Ionicons name="storefront-outline" size={24} color="white" />
                                <Text style={styles.markerLabel}>{store.storeTitle}</Text>
                            </View>
                            <Callout>
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutTitle}>{store.storeTitle}</Text>
                                    <Text style={styles.calloutDescription}>
                                        {store.storeAddress}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                    <Marker
                        coordinate={userLocation}
                        title="Your Location"
                        pinColor="#474744"
                    >
                        <View style={styles.markerContainer}>
                            <Ionicons name="person-circle-outline" size={24} color="red" />
                            <Text style={styles.markerLabel}>You</Text>
                        </View>
                    </Marker>
                    <Circle
                        center={userLocation}
                        radius={500} // Radius in meters
                        strokeColor="rgba(0,255,255,0.5)"
                        fillColor="rgba(0,255,255,0.1)"
                    />
                </MapView>
                <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                    <Ionicons name="close" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    closeButton: {
        position: "absolute",
        top: 50,
        right: 20,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderRadius: 20,
        padding: 10,
    },
    markerContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    markerLabel: {
        color: "white",
        fontWeight: "bold",
    },
    calloutContainer: {
        width: 150,
        padding: 5,
    },
    calloutTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    calloutDescription: {
        fontSize: 14,
        color: "gray",
    },
});

export default MapModal;
