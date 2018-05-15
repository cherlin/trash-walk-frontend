import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ProfileTabNavigator from '../navigation/ProfileTabNavigator';

export default class Profile extends React.Component {
  render() {
    return (
      <View>
      <View style={{ flex: 1, marginTop: 50 }}>
        <Text>Bobby Tables</Text>
      </View>
      <View style={{ flex: 1, marginTop: 50 }}>
        <ProfileTabNavigator />
      </View>
      </View>
    );
  }
}

/*
GET (query: userId):
* Last walks
* Stats
* Badges
*/
