import { createBottomTabNavigator } from 'react-navigation';
import Home from '../screens/Home';
import StartConfirmation from '../screens/StartConfirmation';
import ProfileTabNavigator from './ProfileTabNavigator';

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },
    StartConfirmation: {
      screen: StartConfirmation,
      navigationOptions: {
        tabBarLabel: 'Start Event',
        tabBarVisible: false,
      },
    },
    Profile: {
      screen: ProfileTabNavigator,
      navigationOptions: {
        tabBarLabel: 'Profile',
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
      style: {
        height: 50,
        backgroundColor: '#fff',
      },
    },
  },
);
