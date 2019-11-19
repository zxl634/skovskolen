import MapView from 'react-native-maps';
import React from 'react';
import { View, Dimensions, StyleSheet } from "react-native"

export default function MyMap () {
  return (
<View style={styles.container}>
        <MapView style={styles.mapStyle} />
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
