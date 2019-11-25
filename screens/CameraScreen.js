import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import styles from '../constants/styles';
import Gallery from "../components/Gallery"
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    captures: [],
    capturing: null,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    await MediaLibrary.requestPermissionsAsync()
    // Populate gallery
    await this.getExistingPhotos()
  }

  getExistingPhotos = async () => {
    const myAlbumId = await this.getIdOfMyAlbum()
    const captures = await MediaLibrary.getAssetsAsync({"album": myAlbumId})
    this.setState({captures: captures.assets})
  }

  getIdOfMyAlbum = async () => {
    const albums = await MediaLibrary.getAlbumsAsync()
    const myAlbum = albums.filter(a => a.title === this.getMyAlbumTitle())[0]
    return myAlbum.id
  }

  getMyAlbumTitle = () => {
    return "Skovskolen"
  }

  saveInAlbum = async ({uri}) => {
    const asset = await MediaLibrary.createAssetAsync(uri);
    const albums = await MediaLibrary.getAlbumsAsync()
    const albumTitles = albums.map(a => a.title)
    const myAlbumTitle = this.getMyAlbumTitle()
    if (!albumTitles.includes(myAlbumTitle)) {
      MediaLibrary.createAlbumAsync(myAlbumTitle, asset)
        .then(() => {
          // console.log('Album created!');
        })
        .catch(error => {
          console.log('err', error);
        });
    } else {
      const myAlbumId = albums.filter(a => a.title === myAlbumTitle)[0]
      MediaLibrary.addAssetsToAlbumAsync([asset], myAlbumId.id, true)
    }

  }

  onTakePicture = async () => {
    this.setState({ capturing: true })
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.setState({ capturing: false, captures: [photo, ...this.state.captures] })
      this.saveInAlbum(photo)
    }
  }

  render() {
    const { captures, capturing, hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                  justifyContent: "center",
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.onTakePicture}
              >
                <View style={[styles.captureBtn, capturing && styles.captureBtnActive]}>
                    {capturing && <View style={styles.captureBtnInternal} />}
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
          {captures.length > 0 && <Gallery captures={captures}/>}
        </View>
      );
    }
  }
}

CameraScreen.navigationOptions = {
  tabBarVisible: false,
  header: null,
};
