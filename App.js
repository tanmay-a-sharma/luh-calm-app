import { StyleSheet, Text, View } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import LocalFilesReminder from './components/AssetExample';
import TanmayContainer from './components/TanmayReminder';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        I LOVE MADDIE HERRERA
      </Text>
      <Card>
        <LocalFilesReminder />
      </Card>
      <Card>
        <TanmayContainer />
      </Card>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
