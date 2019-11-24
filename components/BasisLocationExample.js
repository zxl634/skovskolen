import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { taskname } from "./TaskManager"

export default class BasisLocation extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log("status: ", status)
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    /*
    const regions = [
      {
        // "identifier": "myid",
        "latitude": 55.6844,
        "longitude": 12.5357,
        "radius": 10000,
        "state": 1,
      }
    ]
    Location.startGeofencingAsync(taskname, regions).then(result => {
      console.log("result: ", result)

    }).catch(e => console.log(e))
    */
  };

  render() {
    const { errorMessage, location } = this.state
    let text = 'Waiting..';
    if (errorMessage) {
      console.log(errorMessage)
    }
    if (location) {
      // alert(JSON.stringify(location))
      return <>{this.props.render(this.state.location)}</>
    } else {
      return null
    }


    /*
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
    */
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
