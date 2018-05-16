import { createMaterialTopTabNavigator } from 'react-navigation';
import { Constants } from 'expo';
import LastEvents from '../screens/LastEvents';
import Statistics from '../screens/Statistics';
import Achievements from '../screens/Achievements';

export default createMaterialTopTabNavigator(
  {

    LastEvents: {
      screen: LastEvents,
      navigationOptions: {
        tabBarLabel: 'Last Walks',
      },
    },
    Statistics: {
      screen: Statistics,
      navigationOptions: {
        tabBarLabel: 'Statistics',
      },
    },
    Achievements: {
      screen: Achievements,
      navigationOptions: {
        tabBarLabel: 'Badges',
      },
    },
  },
  {
    initialRouteName: 'LastEvents',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#53ad93',
      inactiveTintColor: '#9b9b9b',
      upperCaseLabel: false,
      indicatorStyle: {
        backgroundColor: '#53ad93',
      },
      labelStyle: {
        fontSize: 14,
        fontFamily: 'MontserratSemiBold',
      },
      style: {
        backgroundColor: '#fff',
        borderBottomWidth: 0,
        paddingTop: Constants.statusBarHeight,
      },
    },
  },
);
