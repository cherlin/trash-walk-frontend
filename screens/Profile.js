import React from 'react';
import { View, Text } from 'react-native';
import ProfileTabNavigator from '../navigation/ProfileTabNavigator';

export default class Profile extends React.Component {
  render() {
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <View style={{ flex: 1, position: absolute, top: 20, zIndex: 0 }}>
          <Text>Hello</Text>  
        </View>
        <View style={{ flex: 1 }}>
          <ProfileTabNavigator />
        </View>
      </View>
    );
  }
}

/*
This file is currently not being rendered at all,
since the Main Tab Navigator links directly to the
ProfileTabNavigator.
*/
