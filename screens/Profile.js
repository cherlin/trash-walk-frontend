import React from 'react';
import { Text, View } from 'react-native';
import ProfileTabNavigator from '../navigation/ProfileTabNavigator';

export default class Profile extends React.Component {
  render() {
    return <ProfileTabNavigator />;
  }
}

/*
GET (query: userId):
* Last walks
* Stats
* Badges
*/