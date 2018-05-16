import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Home from '../screens/Home';
import StartConfirmation from '../screens/StartConfirmation';
import ProfileTabNavigator from './ProfileTabNavigator';
import homeActive from '../assets/menu/home-active.png';
import homeInactive from '../assets/menu/home-inactive.png';
import startWalkActive from '../assets/menu/start-walk-active.png';
import startWalkInactive from '../assets/menu/start-walk-inactive.png';
import profileActive from '../assets/menu/profile-active.png';
import profileInactive from '../assets/menu/profile-inactive.png';

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => {
          const homeIcon = focused ? homeActive : homeInactive;
          return (<Image source={homeIcon} />);
        },
      },
    },
    StartConfirmation: {
      screen: StartConfirmation,
      navigationOptions: {
        tabBarLabel: 'Start Event',
        tabBarVisible: false,
        tabBarIcon: ({ focused }) => {
          const startWalkIcon = focused ? startWalkActive : startWalkInactive;
          return (<Image source={startWalkIcon} />);
        },
      },
    },
    Profile: {
      screen: ProfileTabNavigator,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused }) => {
          const profileIcon = focused ? profileActive : profileInactive;
          return (<Image source={profileIcon} />);
        },
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarPosition: 'bottom',
    initialRouteName: 'Home',
    animationEnabled: true,
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 50,
        backgroundColor: '#fff',
      },
    },
  },
);
