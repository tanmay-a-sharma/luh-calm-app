import axios from "axios";
import { Alert } from "react-native";

export const handleLogin = (email, password, onSuccess, onError, navigation) => {
  const loginDetails = {
    email: email,
    password: password,
  };

  axios
    .post("http://localhost:8000/login", loginDetails)
    .then((response) => {
      console.log("Login successful:", response);
      Alert.alert("Login successful", "You are now logged in");
      navigation.navigate("Landing");
      if (onSuccess) {
        onSuccess(response);
        
      }
    })
    .catch((error) => {
      Alert.alert("Login failed", "An error occurred during login");
      console.log("Login failed", error);
      if (onError) {
        onError(error);
      }
    });
};
