import MapView, { Marker } from 'react-native-maps';
import React from 'react';
import { Image, View, Dimensions, StyleSheet } from "react-native"
import BasisLocation from "./BasisLocationExample"
import { markers } from "../constants/markers"

import SvampImg from '../assets/svamp.png';
import BroImg from '../assets/bro.png';
import AgernImg from '../assets/agern.png';
import HuleImg from '../assets/hule.png';
import Trae1Img from '../assets/trae1.png';

export default function MyMap () {
  return (
    <View style={styles.container}>
      <BasisLocation render={({coords}) => {
        console.log("coords: ", coords)
        const myMarker = {
          "key": 0,
          "title": "My current position",
          "latlng":{
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
          "markerType": "default"
        }
        markers.push(myMarker)
        return <MyMapView markers={markers} coords={coords}/>
      }}
      />
    </View>
  )
}

function MyCustomMarkerView (props) {
  const { marker } = props
  function getImgFromName(name) {
    switch (name) {
      case 'svamp':
        return SvampImg;
      case 'agern':
        return AgernImg;
      case 'hule':
        return HuleImg;
      case 'trae1':
        return Trae1Img;
      case 'bro':
        return BroImg;
    }
  }
  return (
    <View>
      <Image
        style={{width:50, height:50}}
        source={getImgFromName(marker.markerType)}
        />
    </View>
  )
}

function MyMapView (props) {
  const { coords, markers } = props
  function getInitialRegion (coords) {
    console.log("coords: ", coords)
    const region = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.013062526519824758,
      longitudeDelta: 0.014861030405512565
    }
    return region;
  }
  const [ region, setRegion ] = React.useState(getInitialRegion(coords))

  function onRegionChange(region) {
    // console.log("region in onRegionChange: ", region)
  }

  return (
    <MapView 
      region={region}
      onRegionChange={onRegionChange}
      style={styles.mapStyle}
    >
      {markers.map(m => {
        if (m.markerType === "default") {
        return (
          <Marker
            coordinate={m.latlng}
            title={m.title}
            key={m.key}
            // description={marker.description}
          />
        )
        } else {
          return (
            <Marker coordinate={m.latlng} key={m.key}>
              <MyCustomMarkerView marker={m}/>
            </Marker>
          )
        }
      })}
    </MapView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: "100%",
    // height: Dimensions.get('window').height - 60,
  },
});
