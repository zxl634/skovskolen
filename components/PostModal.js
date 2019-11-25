import React from "react"
import {ImageBackground, Modal, Text, TouchableHighlight, View, Alert} from 'react-native';
import MyButton from "../components/MyButton"

export default function PostModal (props) {
  const [ modalVisible, setModalVisible ] = React.useState(true)
  const imagePath = "../assets/backgrounds/Popup.png"
  return (
      <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
    <ImageBackground source={require(imagePath)} style={{width:'100%', height:'100%'}} >
              <MyButton
                onPressButton={() => {
                  setModalVisible(!modalVisible);
                }}
                buttonText={"Videre"}
              />
    </ImageBackground>
          </View>
        </Modal>
  )
}
