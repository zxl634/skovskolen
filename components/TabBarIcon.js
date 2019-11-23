import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from "react-native-elements"

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

export function MyIcon (props) {
  return (
    <Icon
      size={26}
      name={props.name}
      type={props.type}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  )
}
