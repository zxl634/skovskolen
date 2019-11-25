import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    const { navigation } = this.props
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        navigation.navigate("Main")
      } else {
        navigation.navigate("Start")
      }
    });
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
      </View>
    );
  }
}
