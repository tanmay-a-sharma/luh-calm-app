import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Card } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';

import LandingScreen from './app/Landing/LandingScreen';
import LoginScreen from './app/Login/LoginScreen';
import RegisterScreen from './app/Register/RegisterScreen';
import PasswordResetScreen from './app/ForgotPassword/PasswordResetScreen';
function HomeScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>


            <View>
                <Text style={styles.paragraph}>I Love Tanmay Sharma</Text>
                <Card>
                    <View style={styles.landingContainer}>
                        <Text style={styles.landingParagraph}>
                            This is going to be the new AKPsi app
                        </Text>
                        <Image style={styles.landingLogo} source={require('./assets/logo.png')}/>

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
                        <Text style={{color: "#000000"}}>Login</Text>
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
                        <Text style={{color: "#000000"}}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const Stack = createNativeStackNavigator();


export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isValidSession, setIsValidSession] = useState(false);

    const validateSession = async () => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            const response = await axios.get(`http://localhost:8000/validateToken/${token}`);
            if (response.data.valid) {
                setIsValidSession(true);
            } else {
                // If the token is not valid, remove it from AsyncStorage
                await AsyncStorage.removeItem('userToken');
                setIsValidSession(false);
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        validateSession();
    }, []);

    if (isLoading) {
        return null; // You can add a loading screen here
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isValidSession ? "Landing" : "Home"}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
                <Stack.Screen name="ResetPassword" component={PasswordResetScreen}/>
                <Stack.Screen name="Landing" component={LandingScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
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
