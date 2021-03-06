import MapView, { Marker } from 'react-native-maps';
import React from 'react';
import { Text, Image, View, Dimensions, StyleSheet } from "react-native"
import { _getLocationAsync, BasisLocation } from "./BasisLocationExample"
import { markers } from "../constants/markers"
import { getDistance, findNearest } from "geolib"

import SvampImg from '../assets/svamp.png';
import BroImg from '../assets/bro.png';
import AgernImg from '../assets/agern.png';
import HuleImg from '../assets/hule.png';
import Trae1Img from '../assets/trae1.png';

export default function MyMap () {
  const [ zone, setZone ] = React.useState()
  const [ previousZone, setPreviousZone ] = React.useState()
  function currentPositionMarker(coords) {
    return {
      "key": 0,
      "title": "My current position",
      "latlng":{
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      "markerType": "default"
    }
  }
  function findNearestMarker (markers, coords) {
    function collectCoordinatesOfMarkers (markers) {
      const markerCoordinates = []
      markers.forEach(m => {
        markerCoordinates.push(m.latlng)
      })
      return markerCoordinates
    }
    const markerCoordinates = collectCoordinatesOfMarkers(markers)
    const nearest = findNearest(coords, markerCoordinates);
    const nearestMarker = markers.filter(m => m.latlng.latitude === nearest.latitude && m.latlng.longitude === nearest.longitude)[0]
    const distanceToNearestMarker = getDistance(nearestMarker.latlng, coords)
    return (
      <View>
        <Text>{"Du er " + distanceToNearestMarker + " meter fra nærmeste post, som er " + nearestMarker.title}</Text>
      </View>
    )
  }
  function showInfoOnZone(zone) {
    if (zone) {
      if (!previousZone) {
        if (zone.onZoneEnter) {
          return zone.onZoneEnter()
        } else {
          alert("Velkommen til " + zone.title)
        }
      }
      setPreviousZone(zone)
      return <Text>{"Du er zonen: " + zone.title}</Text>
    } else {
      setPreviousZone(null)
      return <Text>{"Du er ikke i en zone"}</Text>
    }
  }
  return (
    <View style={styles.container}>
      <BasisLocation render={({coords}) => {
        return (
          <>
            <MyMapView
              markers={markers.concat([currentPositionMarker(coords)])}
              coords={coords}
              zone={zone}
              setZone={setZone}
            />
            {findNearestMarker(markers, coords)}
            {showInfoOnZone(zone)}
          </>
        )
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
  const { zone, setZone, coords, markers } = props
  function getInitialRegion (coords) {
    // console.log("coords: ", coords)
    const region = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.0033837912792193947,
      longitudeDelta: 0.003994445272923031
    }
    return region;
  }
  const [ region, setRegion ] = React.useState(getInitialRegion(coords))

  function onRegionChange(region) {
    // console.log("region in onRegionChange: ", region)
    // setRegion(region)
  }

  const defaultAfstandTilPost = 95

  function checkWhetherCurrentPositionIsCloseToMarker(marker, coords) {
    const distanceToMarker = getDistance(marker.latlng, coords)
    if (distanceToMarker < defaultAfstandTilPost) {
      // alert("Velkommen til " + marker.title)
      setZone(marker)
    } else if (zone && zone.title === marker.title) {
      setZone(null)
    }
  }

  return (
    <MapView
      region={region}
      onRegionChange={onRegionChange}
      style={styles.mapStyle}
    >
      {markers.map(m => {
        if (m.key !== 0) checkWhetherCurrentPositionIsCloseToMarker(m, coords)
        if (m.markerType === "default") {
        return (
          <Marker
            coordinate={m.latlng}
            title={m.title}
            key={m.key}
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
    height: "95%",
  },
});
