import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '../screens/Login';
import MainTabNavigator from './MainTabNavigator';
import CurrentEventToJoin from '../screens/CurrentEventToJoin';
import ActiveEvent from '../screens/ActiveEvent';
import FinishedEventToConfirm from '../screens/FinishedEventToConfirm';
import EventConfirmation from '../screens/EventConfirmation';
import FinishedEventDetail from '../screens/FinishedEventDetail';
import ProfileTabNavigator from './ProfileTabNavigator';

const RootStackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: { header: () => null },
  },
  Home: {
    screen: MainTabNavigator,
    navigationOptions: { header: () => null },
  },
  Profile: {
    screen: ProfileTabNavigator,
    navigationOptions: { header: () => null },
  },
  CurrentEventToJoin: {
    screen: CurrentEventToJoin,
    navigationOptions: { header: () => null },
  },
  StartConfirmation: {
    screen: MainTabNavigator,
    navigationOptions: { header: () => null },
  },
  ActiveEvent: {
    screen: ActiveEvent,
    navigationOptions: { header: () => null },
  },
  FinishedEventToConfirm: {
    screen: FinishedEventToConfirm,
    navigationOptions: { header: () => null },
  },
  EventConfirmation: {
    screen: EventConfirmation,
    navigationOptions: { header: () => null },
  },
  FinishedEventDetail: {
    screen: FinishedEventDetail,
    navigationOptions: { header: () => null },
  },
});

export default function RootNavigator() {
  return <RootStackNavigator />;
}
