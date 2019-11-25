import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import StartScreen from '../screens/StartScreen';
import MainTabNavigator from './MainTabNavigator';
import InfoScreen from "../screens/InfoScreen"
import AuthLoadingScreen from "../screens/AuthLoading"

const StartStack = createStackNavigator(
  {
    StartHere: StartScreen,
    Info: InfoScreen
  },
);


export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Start: StartStack,
    Main: MainTabNavigator,
  },{
    initialRouteName: 'AuthLoading',
  })
);
