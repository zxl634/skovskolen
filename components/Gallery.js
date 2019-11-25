import React from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Linking } from 'expo';

import styles from '../constants/styles';

export default ({captures=[]}) => {
  function onPressImage (uri) {
    console.log("image pressed:", uri)
    // Linking.openURL(uri);
  }
  return (
    <ScrollView
        horizontal={true}
        style={[styles.bottomToolbar, styles.galleryContainer]}
    >
        {captures.map(({ uri }) => (
          <TouchableOpacity
            onPress={e => onPressImage(uri)}
            key={uri}
          >
            <View style={styles.galleryImageContainer}>
                <Image source={{ uri }} style={styles.galleryImage} />
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  )
}
