import MapView, { Marker } from 'react-native-maps';
import React from 'react';
import { Image, View, Dimensions, StyleSheet } from "react-native"
import BasisLocation from "./BasisLocationExample"

export default function MyMap () {
  const markers = [
    {"key": 1,
      "title": "Marker 1",
    "latlng": {"latitude": 55.684487351235,
  "longitude": 13.535789184220123,},
      "markerType": "default"
    }
  ]
  return (
    <View style={styles.container}>
      <BasisLocation render={({coords}) => {
        const myMarker = {
          "key": 0,
          "title": "My current position",
          "latlng":{
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
          "markerType": "custom"
        }
        markers.push(myMarker)
        return (
          <MapView style={styles.mapStyle}>
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
                    <MyCustomMarkerView/>
                  </Marker>
                )
              }
            })}
          </MapView>
        )}}
      />
    </View>
  )
}

function MyCustomMarkerView (props) {
  return (
    <View>
        <Image
          // style={styles.stretch}
          source={require('../assets/images/acorn.png')}
        />
      </View>

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
