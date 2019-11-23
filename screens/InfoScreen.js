import React, { Component } from 'react'
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native'

import { TouchableOpacity } from 'react-native-gesture-handler';
import { hidden } from 'ansi-colors';

export default class InfoScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    
    static navigationOptions = { //fjerner headeren og fjerner den hvide bar i toppen
      header: null
    }
  
    render() {
      return (
        <ImageBackground source={require('../assets/infoScreen.png')}
          style={{width:'100%', height:'100%'}
        >
          <View style={styles.tekstContainer}>
          <Image
            style={styles.baever2}
            source={require('../assets/baever2.png')}
          />
          <Text style={styles.paragraph}>
            Jeg har sat nogle poster op i skoven som du skal rundt og finde. På turen vil du lære en masse om livet i skoven!
              {"\n"} {"\n"}Klik på mig for at komme igang. 
          </Text>
          </View>
        </ImageBackground>
      )
    }
  }

//Styling starter her
  const styles = StyleSheet.create({ //opretter stylesheet
    tekstContainer: {
      paddingTop: 80,
      paddingBottom: 80,
      marginHorizontal: 25,
    },

    paragraph: {
      //margin:75,
      fontSize: 20,
      textAlign: 'center',
      color: 'black',
      padding: 15,
    },

    baever2: {
      width: 100,
      height: 70,
      left: 50,
      marginTop: '20%',
      position: 'absolute',
    }
  })
