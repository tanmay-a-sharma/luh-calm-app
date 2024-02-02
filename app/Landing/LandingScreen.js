import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

function LandingScreen({ navigation }){
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => null,
        });
    }, [navigation]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const id = await AsyncStorage.getItem('userToken');
            console.log("id: " + id); // Log the value of id
            if (id) {
                axios.get('http://localhost:8000/announcements', {
                    headers: {
                        'authorization': id
                    }
                })
                    .then(response => {
                        setAnnouncements(response.data);
                    })
                    .catch(error => {
                        navigation.navigate('Home');
                        console.error('There has been a problem with your fetch operation:', error);
                    });
            }
        };
        fetchAnnouncements();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {announcements.map((announcement, index) => (
                <Pressable style={styles.card} key={index}>
                    <Text style={styles.title} role="heading" aria-label={announcement.title}>
                        {announcement.title}
                    </Text>
                    <Text style={styles.content} role="text" aria-label={announcement.content}>
                        {announcement.content}
                    </Text>
                    <Text style={styles.author} role="text" aria-label={announcement.author}>
                        {announcement.author}
                    </Text>
                    <Text style={styles.time} role="text" aria-label={`Posted on: ${new Date(announcement.createdAt).toLocaleString()}`}>
                        Posted on: {new Date(announcement.createdAt).toLocaleString()}
                    </Text>
                </Pressable>
            ))}
        </SafeAreaView>
    );
}

export default LandingScreen;

// ... rest of your code



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#003f5c',
    },
    card: {
        backgroundColor: '#465881',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        boxShadow: '0px 1px 2px #000', // Replace shadow* with boxShadow
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ffffff',
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
        color: '#ffffff',
    },
    author: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#ffffff',
    },
    time: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#ffffff',
    },
});