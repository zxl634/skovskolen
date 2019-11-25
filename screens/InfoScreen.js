import React from "react"
import { StyleSheet, Image, ImageBackground } from "react-native"
import MyButton from "../components/MyButton"
import 'firebase/auth';
import * as firebase from 'firebase/app';

export default function InfoScreen (props) {
  const imagePath = "../assets/backgrounds/Infobackground.png"
  function onPressStart () {
    firebase.auth().signInAnonymously().then(() => {
      props.navigation.navigate("Info")
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
    });
  }
  return (
    <ImageBackground source={require(imagePath)} style={{width:'100%', height:'100%'}} >
      <MyButton
        onPressButton={onPressStart}
        buttonText={"Start turen"}
      />
    </ImageBackground>
  )
}

InfoScreen.navigationOptions = {
  tabBarVisible: false,
  header: null,
};
