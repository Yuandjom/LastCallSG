import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

const orders = () => {
    const [activeTab, setActiveTab] = useState('Open');

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Orders</Text>
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setActiveTab('Open')} style={styles.tab(activeTab === 'Open')}>
                    <Text style={styles.tabText(activeTab === 'Open')}>Open</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Close')} style={styles.tab(activeTab === 'Close')}>
                    <Text style={styles.tabText(activeTab === 'Close')}>Close</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {activeTab === 'Open' ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emoji}>👀</Text>
                        <Text style={styles.noOrdersText}>You don't have any orders</Text>
                        <Text style={styles.subText}>Save money, reduce waste</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Let's save something</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Display content for Close tab
                    <View style={styles.emptyContainer}>
                        <Text style={styles.noOrdersText}>No closed orders</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};
export default orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        paddingTop: 50, // Adjust for safe area if needed
        paddingBottom: 15,
        backgroundColor: '#fff',
        alignItems: 'left',
        paddingLeft: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tab: (isActive) => ({
        flex: 1,
        paddingVertical: 15,
        borderBottomWidth: isActive ? 2 : 0,
        borderBottomColor: isActive ? '#000' : 'transparent',
        alignItems: 'center',
    }),
    tabText: (isActive) => ({
        color: isActive ? '#000' : '#888',
        fontWeight: isActive ? 'bold' : 'normal',
    }),
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 50,
        marginBottom: 20,
    },
    noOrdersText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subText: {
        color: '#888',
        marginBottom: 20,
    },
    linkText: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
});
