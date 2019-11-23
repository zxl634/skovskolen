import React from "react"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

export default function MyButton (props) {
  const { buttonText, onPressButton } = props
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.StartTuren} 
        onPress={onPressButton}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({ //opretter stylesheet
  StartTuren: {
    color: 'red',
    backgroundColor: '#fc7355',
    padding: 15,
    borderRadius: 20,

    //paddingHorizontal: 5,

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
  buttonText:{
    color: "white",
    textAlign: 'center',
    fontSize: 20,
  } 
})
