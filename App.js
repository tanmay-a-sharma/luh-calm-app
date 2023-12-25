import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// You can import supported modules from npm
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Card } from 'react-native-paper';


// or any files within the Snack
import Landing from './components/LandingPage';
import LoginScreen from './components/Login/LoginScreen';

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.paragraph}>
          I love Tanmay Sharma
        </Text>
        <Card>
          <Landing />
        </Card>
        <View style={{ width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
        style={{
          backgroundColor: '#c0af46',
          padding: 10,
          width: '50%', // Percentage width
          alignItems: 'center',
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#000000' }}>LOGIN</Text>
      </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}



const Stack = createNativeStackNavigator();


function App(){
  return (<NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen}/>
      </Stack.Navigator>

  </NavigationContainer>)

}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    backgroundColor: '#093671',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#c0af46"
  },
});
