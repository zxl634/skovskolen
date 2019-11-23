import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import * as firebase from 'firebase/app';
import { NavigationActions } from 'react-navigation';
import 'firebase/auth';
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
  const [ fetchingUserStatus, setFetchingUserStatus ] = React.useState(true)
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        props.navigation.navigate("Main")
      } else {
        setFetchingUserStatus(false)
      }
    });
  })
  function onPressStart () {
    setFetchingUserStatus(true)
    firebase.auth().signInAnonymously().then(() => {
      props.navigation.navigate("Main")
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
    });
  }

  if (fetchingUserStatus) {
    return <ActivityIndicator/>
  } else {
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

