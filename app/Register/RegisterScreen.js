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
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);

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
          setErrorMessage("");
          setEmailStatus('success');
        })
        .catch((error) => {
          console.log("registration failed on screen", error);
          setErrorMessage(error.response.data.message);
          setEmailStatus('error');

          if (error.response.data.message === 'You already have an account!') {
            // Handle email already in use error
            Alert.alert(
                "Registration failed",
                "The email you entered is already in use."
            );
          } else if (error.response.data.message === 'Your passwords are not the same') {
            // Handle password error
            Alert.alert(
                "Registration failed",
                "There was an error with the password you entered."
            );
          } else {
            // Handle other errors
            Alert.alert(
                "Registration failed",
                error.response.data.message
            );
          }
        });
  };

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

          {emailStatus === 'success' && (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>Verify profile first with your email</Text>
              </View>
          )}
          {emailStatus === 'error' && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
          )}
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
  successContainer: {
    backgroundColor: "rgba(0, 255, 0, 0.5)", // Green color with 50% opacity
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  successText: {
    color: "black",
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: "rgba(255, 0, 0, 0.5)", // Red color with 50% opacity
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
});

export default RegisterScreen;
