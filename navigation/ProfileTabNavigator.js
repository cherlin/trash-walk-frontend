import { createMaterialTopTabNavigator } from 'react-navigation';
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
        tabBarLabel: 'Statitics',
      },
    },
    Achievements: {
      screen: Achievements,
      navigationOptions: {
        tabBarLabel: 'Achievements',
      },
    },
  },
  {
    initialRouteName: 'LastEvents',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        color: '#000',
      },
      style: {
        paddingTop: 30,
        backgroundColor: '#fff',
      },
    },
  },
);
