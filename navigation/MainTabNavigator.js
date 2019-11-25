import React from 'react';
import { View, Image, Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon, { MyIcon } from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/MapScreen';
import DiplomasScreen from '../screens/DiplomasScreen';
import CameraScreen from '../screens/CameraScreen';
import Colors from '../constants/Colors';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profil',
  tabBarIcon: ({ focused }) => (
    <MyIcon
      focused={focused}
      name={"home"}
      type={"entypo"}
    />
  ),
};

ProfileStack.path = '';

const MapStack = createStackNavigator(
  {
    Map: MapScreen,
  },
  config
);

MapStack.navigationOptions = {
  tabBarLabel: 'Kort',
  tabBarIcon: ({ focused }) => (
    <MyIcon
      focused={focused}
      name={"map"}
      type={"font-awesome"}
    />
  ),
};

MapStack.path = '';

const DiplomasStack = createStackNavigator(
  {
    Diplomas: DiplomasScreen,
  },
  config
);

DiplomasStack.navigationOptions = {
  tabBarLabel: 'Diplomer',
  tabBarIcon: ({ focused }) => (
    <View>
      <Image
        style={{flex: 1, width: 20, resizeMode: "contain"}}
        source={require('../assets/icons/DiplomIcon.png')}
      />
    </View>
  ),
};

DiplomasStack.path = '';

const CameraStack = createStackNavigator(
  {
    Camera: CameraScreen,
  },
  config
);

CameraStack.navigationOptions = {
  tabBarLabel: 'Kamera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-camera"} />
  ),
};

CameraStack.path = '';

const tabNavigator = createBottomTabNavigator({
  MapStack,
  CameraStack,
  DiplomasStack,
  ProfileStack,
}, {
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.tabIconDefault,
    labelStyle: {
      fontSize: 15,
    },
    style: {
      backgroundColor: Colors.tabBarBackground,
      height: 60,
    },
  },
});

tabNavigator.path = '';

export default tabNavigator;
