import { StyleSheet, Text, View } from 'react-native';

export default function TanmayContainer(){
      return(
            <View style = {styles.container}>
                  <Text style= {styles.paragraph}>
                        Tanmay da goat
                  </Text>
            </View>
      );
}


const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
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