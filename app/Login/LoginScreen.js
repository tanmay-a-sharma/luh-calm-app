import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";


import { handleLogin } from './auth'; // adjust the path as necessary


function LoginScreen({ navigation }) {
  const [email, checkEmail] = useState("");
  const [password, checkPassword] = useState("");

  // Function to handle the login logic will go here

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Login to Your Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#c0af46"
          value={email}
          onChangeText={checkEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#c0af46"
          autoCapitalize="none"
          value={password}
          onChangeText={checkPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            handleLogin(email,password,null,null,navigation);
          }}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonSpacer} />

      <View style={styles.registerContainer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerButtonText}>I don't have a profile</Text>
        </TouchableOpacity>
      </View>

      <Pressable
        style={{ marginTop: 15 }}
        onPress={() => navigation.navigate("ResetPassword")} // Added onPress event handler here
      >
        <Text style={{
            textAlign: "center",
            color: "white",
            fontSize: 16,
            textDecorationLine: 'underline'
        }}>
          Forgot password?
        </Text>
      </Pressable>

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
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
  },
  loginTitle: {
    fontSize: 22,
    color: "#093671",
    fontWeight: "bold",
    marginBottom: 20,
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
});

export default LoginScreen;
