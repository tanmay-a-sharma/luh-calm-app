import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";



// You can import supported modules from npm
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Card } from "react-native-paper";

// or any files within the Snack
import PasswordResetScreen from "./app/ForgotPassword/PasswordResetScreen";
import LandingScreen from "./app/Landing/LandingScreen";
import LoginScreen from "./app/Login/LoginScreen";
import RegisterScreen from "./app/Register/RegisterScreen";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      

      <View>
        <Text style={styles.paragraph}>I Love Tanmay Sharma</Text>
        <Card>
          <View style={styles.landingContainer}>
            <Text style={styles.landingParagraph}>
              This is going to be the new AKPsi app
            </Text>
            <Image style={styles.landingLogo} source={require('./assets/Logo.png')} />

          </View>
        </Card>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#c0af46",
              padding: 10,
              minWidth: 100, // Minimum width for small screens
              maxWidth: 200, // Maximum width for large screens
              width: "40%", // Relative width
              alignItems: "center",
              borderRadius: 8,
              margin: 5, // Space between buttons
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "#000000" }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#c0af46",
              padding: 10,
              minWidth: 100, // Minimum width for small screens
              maxWidth: 200, // Maximum width for large screens
              width: "40%", // Relative width
              alignItems: "center",
              borderRadius: 8,
              margin: 5, // Space between buttons
            }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ color: "#000000" }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ResetPassword" component={PasswordResetScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Landing" component={LandingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    backgroundColor: "#093671",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#c0af46",
  },
  landingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#093671',
  },
  landingParagraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#c0af46',
  },
  landingLogo: {
    height: 128,
    width: 128,
  }
});
