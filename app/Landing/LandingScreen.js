import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
      SafeAreaView,
      StyleSheet,
      Text,
      View,
} from 'react-native';

function LandingScreen() {
      const [announcements, setAnnouncements] = useState([]);

      useEffect(() => {
            axios.get('http://localhost:8000/announcements')
                .then(response => {
                      setAnnouncements(response.data);
                })
                .catch(error => {
                      console.error('There has been a problem with your fetch operation:', error);
                });
      }, []);
      return (
          <SafeAreaView style={styles.container}>
                {announcements.map((announcement, index) => (
                    <View style={styles.card} key={index}>
                          <Text style={styles.title}>
                                {announcement.title}
                          </Text>
                          <Text style={styles.content}>
                                {announcement.content}
                          </Text>
                          <Text style={styles.author}>
                                {announcement.author}
                          </Text>
                          <Text style={styles.time}>
                                Posted on: {new Date(announcement.createdAt).toLocaleString()}
                          </Text>
                    </View>
                ))}
          </SafeAreaView>
      );
}

export default LandingScreen;

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
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
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