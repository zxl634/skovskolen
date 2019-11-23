import React from 'react';
import { View, Image, Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon, { MyIcon } from '../components/TabBarIcon';
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
    <MyIcon
      focused={focused}
      name={"home"}
      type={"entypo"}
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
    <View>
      <Image
        style={{flex: 1, width: 20, resizeMode: "contain"}}
        source={require('../assets/icons/SearchIcon.png')}
      />
    </View>
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
      // height: 50,
    },
  },
});

tabNavigator.path = '';

export default tabNavigator;
