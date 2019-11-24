// Example of how to implement support for basic GeoFencing functionality
//on top of expo-location. Auth: Tomasok PINT-Oct.2019

import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image  } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import * as Permissions from 'expo-permissions';

import SvampImg from '../assets/svamp.png';
import BroImg from '../assets/bro.png';
import AgernImg from '../assets/agern.png';
import HuleImg from '../assets/hule.png';
import Trae1Img from '../assets/trae1.png';

import { pointsOfInterest, addPointOfInterest, orderDistanceArray } from "../helpers/PointsOfInterest"

function initalizePointsOfInterest() {
  addPointOfInterest(55.8385,12.4616,2000, 'Bro');
  addPointOfInterest(55.8391,12.4586,2000, 'Svamp');
  addPointOfInterest(55.8382,12.4539,2000,'Trae1');
  addPointOfInterest(55.8410, 12.4554,2000,'Hule');
  addPointOfInterest(55.8363, 12.4593,2000,'Agern');
};

export default class GeoFenceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    location: null,
    errorMessage: null,
    region: null,
    marker : null
    };
  };


  async componentDidMount() {
    await this.AskPermission(); // Check that we have permission to access location data - ask if we don't
    this.watchId = await Location.watchPositionAsync(
      {accuray:Location.Accuracy.BestForNavigation , timeInterval:1000, distanceInterval:1,  mayShowUserSettingsDialog:true},
      // This is the callback function specifying  all the stuff that we want to happen whenver we have a new location
      (currentPosition) => {
        orderDistanceArray({latitude: currentPosition.coords.latitude, longitude:currentPosition.coords.longitude});

        this.setState({
          location:currentPosition,
          region: {
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.075, // About 11 km
            longitudeDelta: 0.075, // About 6 km
          },
          marker: {
                  latlng :currentPosition.coords
          },

          error: null,
        });
        if ( pointsOfInterest[0].currentDistance<pointsOfInterest[0].radius) // Only checkig if in the zone of nearest ! flaw ?
        {
          //this.props.inZone( pointsOfInterest[0]);
          this.props.inZone(true, pointsOfInterest[0]);
          //console.log(this.props.showCoordinates);

        }
         // Just in case we want to log while debugging
        //console.group(pointsOfInterest);
      }
    );
  }

  componentWillUnmount() {
    this.watchId.remove(); // stop watching for location changes
  }

 AskPermission  = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('Asking for geo permission: ' + status);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
  };

  getImgFromName(name) {
    switch (name) {
      case 'Svamp':
        return SvampImg;
      case 'Agern':
        return AgernImg;
      case 'Hule':
        return HuleImg;
      case 'Trae1':
        return Trae1Img;
      case 'Bro':
        return BroImg;
    }
  }

// Preparing and  rendering what to put on the screen

  render() {
  const {location} = this.state; // Taking location from overall state object

  let text = 'Venter på mine koordinater ..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {

      {text = "timestamp:"+location.timestamp + "\n"+ " Længdegrad: " + location.coords.longitude + "\n" +" Breddegrad: " + location.coords.latitude;}
    }

    return (
      <View style={styles.container}>

        {this.state.region ?
        ( <MapView style={styles.mapStyle}   region={this.state.region} >

            {/* <Marker  coordinate={this.state.marker.latlng} title ='Vores lokation' description = 'På vej igen ..' pinColor = 'gold'/> */}



            {pointsOfInterest.map((p,index) => (
              <Marker
                key = {index}
                coordinate={p.coords}
                title ={p.whatis}
                pinColor = {(index==0 && p.currentDistance<p.radius) ? 'blue' : 'red'}   // Make marker blue if it is our zone
              >
                <Image source={this.getImgFromName(p.whatis)} style={{width:50, height:50}}/>
              </Marker>
            ))}

         </MapView>
         )
         : <Text styles={styles.paragraph} >Venter på mine koordinater ....</Text>}
       {(this.props.showCoordinates) ? <Text style={styles.paragraph}>{text}</Text> : null}
      </View>
    );
  }
}


// ------------- Things to do on start ------------------------
initalizePointsOfInterest();

// ------------ Styles ----------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  mapStyle: {
   // margin:5,
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height*2/3,
    height: Dimensions.get('window').height,
  },
});


