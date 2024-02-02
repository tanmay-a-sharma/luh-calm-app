import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleLogin = (email, password, onSuccess, onError, navigation) => {
    const loginDetails = {
        email: email,
        password: password,
    };

    axios
        .post("http://localhost:8000/login", loginDetails, {
            headers: {
                'Content-Type': 'application/json'
                // Add any other headers your server requires
            }
        })
        .then(async (response) => {
           // console.log("Login successful:", response);
            await AsyncStorage.setItem('userToken', response.data.token);

            Alert.alert("Login successful", "You are now logged in");
            navigation.navigate("Landing");

            // Add your original .then response here
            if (onSuccess) {
                onSuccess(response);
            }
        })
        .catch((error) => {
            Alert.alert("Login failed", "An error occurred during login");
            console.log("Login failed", error);

            // Add your original .catch error handling here
            if (onError) {
                onError(error);
            }
        });
};
