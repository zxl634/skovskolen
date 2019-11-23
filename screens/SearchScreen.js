import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import MapScreen from "./MapScreen"

export default function SearchScreen() {
  return (
    <MapScreen/>
  );
}

SearchScreen.navigationOptions = {
  // tabBarVisible: false,
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
