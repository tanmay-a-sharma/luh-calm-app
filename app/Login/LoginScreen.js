import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("", {
        // insert endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login, ex, navigate to another screen or store token
        console.log("Login successful:", data);
        // Example: navigation.navigate('ProfileScreen');
      } else {
        // Handle login failure
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      // Handle network errors
      console.error("Login error:", error);
      Alert.alert("Error", "Unable to connect to the server");
    }
  };

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
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            /* Function to handle login */
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
          <Text style={styles.registerButtonText}>Create My Profile</Text>
        </TouchableOpacity>
      </View>

      <Pressable style={{ marginTop: 15 }}>
        <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
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
