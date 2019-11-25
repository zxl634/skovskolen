import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { NavigationActions } from 'react-navigation';
import {
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import MyButton from "../components/MyButton"

export default function HomeScreen(props) {
  function onPressStart () {
    props.navigation.navigate("Info")
  }

    return (
      <ImageBackground source={require("../assets/backgrounds/startScreen.png")} style={{width: '100%', height: '100%'}}>
          <View style={styles.startContainer}>
            <Text style={styles.paragraph}> Velkommen til </Text>
            <MyButton
              onPressButton={onPressStart}
              buttonText={"Start turen"}
            />
          </View>
      </ImageBackground>
    );
  
}

HomeScreen.navigationOptions = {
  tabBarVisible: false,
  header: null,
};
  const styles = StyleSheet.create({ //opretter stylesheet
    paragraph: {
      margin:75,
      fontSize: 28,
      textAlign: 'center',
      color: 'white',
      // fontFamily: "Gaegu",
    },
    startContainer: {
      flex: 1, //sætter baggrunden til at fylde hele skærmen
    },
    buttonContainer:{
      flex:1,
      paddingHorizontal:90,
      //paddingTop:'80%',
      paddingBottom: 0,
      overflow: 'hidden',
      justifyContent: 'center',
      marginTop: 260
    },
    StartTuren: {
      color: 'red',
      backgroundColor: '#fc7355',
      padding: 15,
      borderRadius: 20,
      
      //paddingHorizontal: 5,
      
    },

    startTurenTekst:{
      color: "white",
      textAlign: 'center',
      fontSize: 20,
    } 
  })

