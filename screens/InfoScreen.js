import React from "react"
import { StyleSheet, Image, ImageBackground } from "react-native"

export default function InfoScreen (props) {
  const imagePath = "../assets/backgrounds/Infobackground.png"
  return (
    <ImageBackground source={require(imagePath)} style={{width:'100%', height:'100%'}} >
        </ImageBackground>
  )
}
