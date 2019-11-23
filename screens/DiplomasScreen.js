import React from 'react';
import { ImageBackground } from "react-native"

export default function DiplomasScreen() {
  return (
    <ImageBackground source={require("../assets/backgrounds/DiplomScreen.png")} style={{width: '100%', height: '100%'}}>
    </ImageBackground>
  )
}

DiplomasScreen.navigationOptions = {
  header: null,
}
