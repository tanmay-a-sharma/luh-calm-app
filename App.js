import React from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import LocalFilesReminder from './components/AssetExample';
import TanmayContainer from './components/TanmayReminder';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>

        <Text style={styles.paragraph}>
          I love Tanmay Sharma
        </Text>

        <Card>
          <LocalFilesReminder />
        </Card>

        <Card>
          <TanmayContainer />
        </Card>

        <View style={{ width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
        style={{
          backgroundColor: '#c0af46',
          padding: 10,
          width: '50%', // Percentage width
          alignItems: 'center',
        }}
        onPress={() => Alert.alert('Button pressed')}>
  
        <Text style={{ color: '#000000' }}>LOGIN</Text>
      
      </TouchableOpacity>
          

        </View>
        
      </View>
      
    </SafeAreaView>
  );
}

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
