import React, { useState } from 'react';
import {
      SafeAreaView,
      StyleSheet,
      TextInput,
      View
} from 'react-native';
function PasswordResetScreen({navigation}){

      const [name, checkName] = useState('');
      const [email, checkEmail] = useState('');

      const handleRegister = async () => {
            try {
              const response = await fetch('https://your-backend-api.com/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email}),
              });
          
              const data = await response.json();
          
              if (response.ok) {
                // Handle successful login, e.g., navigate to another screen or store token
                console.log('Login successful:', data);
                // Example: navigation.navigate('ProfileScreen');
              } else {
                // Handle login failure
                Alert.alert('Login Failed', data.message || 'Invalid credentials');
              }
            } catch (error) {
              // Handle network errors
              console.error('Login error:', error);
              Alert.alert('Error', 'Unable to connect to the server');
            }
      };

      return (
      <SafeAreaView>
            <View>
            <TextInput
                  // style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#c0af46"
                  value={name}
                  onChangeText={checkName}
                  />

            <TextInput
                  // style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#c0af46"
                  value={email}
                  onChangeText={checkEmail}
            />
            </View>

      </SafeAreaView>
      );
}

export default PasswordResetScreen

const styles = StyleSheet.create({})