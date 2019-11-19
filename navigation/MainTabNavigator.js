import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import DiplomasScreen from '../screens/DiplomasScreen';
import CameraScreen from '../screens/CameraScreen';
import Colors from '../constants/Colors';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Hjem',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={"md-home"}
    />
  ),
};

HomeStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Søg',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-search"} />
  ),
};

SearchStack.path = '';

const DiplomasStack = createStackNavigator(
  {
    Diplomas: DiplomasScreen,
  },
  config
);

DiplomasStack.navigationOptions = {
  tabBarLabel: 'Diplomer',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-journal"} />
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
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-camera"} />
  ),
};

CameraStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SearchStack,
  DiplomasStack,
  CameraStack,
}, {
  tabBarOptions: {
    // activeTintColor: 'tomato',
    // inactiveTintColor: 'gray',
    style: {
      backgroundColor: Colors.tabBarBackground,
    },
  },
});

tabNavigator.path = '';

export default tabNavigator;
