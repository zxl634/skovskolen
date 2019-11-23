import React, { Component } from 'react'
import { Text, View , StyleSheet} from 'react-native'

export default class ZoneScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
       <Text style={styles.paragraph}> {'Velkommen til zonen ved ' + params.what} </Text>
      </View>
    )
  }
}

//Styling starter her

const styles = StyleSheet.create({
    paragraph: {
      margin:10,
      fontSize: 18,
      textAlign: 'center'  
    } })