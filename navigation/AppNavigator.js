import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import StartScreen from '../screens/StartScreen';
import MainTabNavigator from './MainTabNavigator';

const StartStack = createStackNavigator({ Start: StartScreen });

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Start: StartStack,
    Main: MainTabNavigator,
  },{
    initialRouteName: 'Start',
  })
);
