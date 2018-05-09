import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    margin: 40,
  },
});

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Current walks in this area</Text>
        <Button title="Current (ongoing) walk" onPress={() => this.props.navigation.navigate('CurrentEventToJoin')} />
        <Text style={styles.header}>Home Screen</Text>
        <Text>Latest walks in this area</Text>
        <Button title="Previous walk" onPress={() => this.props.navigation.navigate('FinishedEventDetail')} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.events.User.location,
  currentEvents: state.events.currentEventsInArea,
  latestEvents: state.events.latestEventsInArea,
  globalStats: state.stats.global,
  nationalStats: state.stats.national,
  localStats: state.stats.local,
});

export default connect(mapStateToProps, null)(Home);



/*

ASK: Permission to use GPS (always).
If [No] - give message to user that they will not be able to use the app properly.
If [Yes] - get user position and save to state (User > currentLocation).

GET (query: currentLocation):
* Current Events at Location (every 5 seconds)
* Stats (Global, National and Local) (every 20 seconds) - either one or three queries.
* Past Events at Location (every 30 seconds)

STATE (Redux Store):
User: {
  location: {
    currentLocation: [0.234123123, 32.12331233]
    timeStamp: 123123123123
  }
}
HomeScreen: {
  events: {
    currentEventsInArea: [
      {
        eventId: 12ghj13ghj2jhg3
        image: 'beach',
        participants: 16,
        startTime: 123142543453
      },
      {
        eventId: 12ghj13ghj2jh32
        image: 'woods',
        participants: 2,
        startTime: 123142443453
      },
    ],
    stats: {
      global: {
        week: {
          participants: 27,
          timeSpent: 123123123123,
          areaCleaned: 123123123132
        },
        month: {
          participants: 100,
          timeSpent: 123123123123453,
          areaCleaned: 123123123423132
        },
        year: {
          participants: 284,
          timeSpent: 123123123123,
          areaCleaned: 123123123132
        },
      },
      national: {
        week: {
          participants: 27,
          timeSpent: 123123123123,
          areaCleaned: 123123123132
        },
        month: {
          participants: 100,
          timeSpent: 123123123123453,
          areaCleaned: 123123123423132
        },
        year: {
          participants: 284,
          timeSpent: 123123123123,
          areaCleaned: 123123123132
        },
      },
      local: {
        week: {
          participants: 27,
          timeSpent: 123123123123,
          areaCleaned: 123123123132
        },
        month: {
          participants: 100,
          timeSpent: 123123123123453,
          areaCleaned: 123123123423132
        },
        year: {
          participants: 284,
          timeSpent: 123123123123,
          areaCleaned: 123123123132
        },
      },
    }
    latestEventsInArea: [
      {
        eventId: 12ghj13ghsdfjhg3
        image: 'map',
        participants: 16,
        endTime: 123142543453
      },
      {
        eventId: 12ghj13sdfsj2jhg3
        image: 'map',
        participants: 2,
        endTime: 123142443453
      },
    ]
  },
}
*/
