import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassowrd] = useState('');


  const handleRegister = async () => {
    try {
      const response = await fetch('https://your-backend-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, confirmedPassword}),
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

  // Function to handle the login logic will go here

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Create Your Profile</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#c0af46"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#c0af46"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#c0af46"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#c0af46"
          value={confirmedPassword}
          onChangeText={setConfirmedPassowrd}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {/* Function to handle login */}}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonSpacer: {
    height: 15, // Or any other value that gives desired space
  },
  container: {
    flex: 1,
    backgroundColor: '#093671',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  loginTitle: {
    fontSize: 22,
    color: '#093671',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: '#c0af46',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  registerContainer: {
    width: '80%', // Same width as loginContainer
    alignItems: 'center', // Center the button
    // Do not include background color or padding like in loginContainer
  },
  registerButton: {
    // Same style as loginButton
    backgroundColor: '#c0af46',
    padding: 10,
    width: '100%', // Button takes full width of its container
    alignItems: 'center',
    borderRadius: 5,
  },
  registerButtonText: {
    // Style for the register button text
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
