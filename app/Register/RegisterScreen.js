import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";



function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [pledgeClass, setPledgeClass] = useState("");

  const handleRegister = () => {
    const user = {
      name: name,
      pledgeClass: pledgeClass,
      email: email,
      password: password,
      confirmedPassword: confirmedPassword,
      
    };

    axios
      .post("http://localhost:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful:",
          "You have been registered successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setConfirmedPassword("");
        setPledgeClass("");
      })
      .catch((error) => {
        Alert.alert(
          "registration failed",
          "an error occurred while registering"
        );
        console.log("registration failed on screen", error);
      });

    // axios.get("http")
      
  };

  // const handleRegister = async () => {
  //   try {
  //     const response = await fetch('https://your-backend-api.com/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ name, email, password, confirmPassword, pledgeClass}),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       // Handle successful login, e.g., navigate to another screen or store token
  //       console.log('Login successful:', data);
  //       // Example: navigation.navigate('ProfileScreen');
  //     } else {
  //       // Handle login failure
  //       Alert.alert('Login Failed', data.message || 'Invalid credentials');
  //     }
  //   } catch (error) {
  //     // Handle network errors
  //     console.error('Login error:', error);
  //     Alert.alert('Error', 'Unable to connect to the server');
  //   }
  // };

  // Function to handle the login logic will go here

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        bounces={true} // Enable bouncing effect
      >

        <View style={styles.loginContainer}>
          
          <Text style={styles.loginTitle}>Register</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#c0af46"
            value={name}
            onChangeText={setName}
          />

          <Picker
            selectedValue={pledgeClass}
            onValueChange={(itemValue) => setPledgeClass(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Select Pledge Class" value="" />
            
            <Picker.Item label="Spring 21" value="Spring21" />
            <Picker.Item label="Fall 21" value="Fall21" />
            <Picker.Item label="Spring 22" value="Spring22" />
            <Picker.Item label="Fall 22" value="Fall22" />
            <Picker.Item label="Spring 23" value="Spring23" />
            <Picker.Item label="Fall 23" value="Fall23" />
          </Picker>

        

          

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
            onChangeText={setConfirmedPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
              handleRegister();
            }}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonSpacer: {
    height: 15, // Or any other value that gives desired space
  },
  container: {
    flex: 1,
    backgroundColor: "#093671",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    width: "95%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    minWidth:300,
  },
  loginTitle: {
    fontSize: 22,
    color: "#093671",
    fontWeight: "bold",
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
    marginVertical: 8,
    // For Android, you might be able to set the height directly:
    height: 40, // Set the height to match your TextInput fields
    // iOS-specific properties
    justifyContent: 'center',
  },
  pickerItem: {
    height: '100%',
    color: 'black', // This is the text color inside the picker
  },
  input: {
    width: "100%",
    backgroundColor: "#ecf0f1",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "#c0af46",
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    color: "#000000",
    fontWeight: "bold",
  },
  registerContainer: {
    width: "80%", // Same width as loginContainer
    alignItems: "center", // Center the button
    // Do not include background color or padding like in loginContainer
  },
  registerButton: {
    // Same style as loginButton
    backgroundColor: "#c0af46",
    padding: 10,
    width: "100%", // Button takes full width of its container
    alignItems: "center",
    borderRadius: 5,
  },
  registerButtonText: {
    // Style for the register button text
    color: "#000000",
    fontWeight: "bold",
  },
  scrollViewContainer: {
    flexGrow: 30, // Ensures that the content fills the space
    justifyContent: 'center', // Centers content when it's smaller than screen
    alignItems: 'center', // Aligns content horizontally
    paddingHorizontal:10,
  },
});

export default RegisterScreen;
