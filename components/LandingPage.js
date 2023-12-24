import { Image, StyleSheet, Text, View } from 'react-native';

export default function Landing() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        This is going to be the new AKPsi app
      </Text>
      <Image style={styles.logo} source={require('../assets/snack-icon.png')} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#093671',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#c0af46',
  },
  logo: {
    height: 128,
    width: 128,
  }
});
