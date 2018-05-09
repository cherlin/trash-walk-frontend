import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import { getLocationEvents } from '../actions/events';
import { getLocationStats } from '../actions/stats';

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
  componentDidMount() {
    this.props.getLocationEvents(this.props.currentUserLocation);
    this.props.getLocationStats(this.props.currentUserLocation);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Home Screen</Text>
        <View>
          <Text>Current walks in this area</Text>
          { this.props.currentEventsInArea.map(event => (
            <Text key={event.eventId}>
              Start: {event.startTime}. Participant: {event.participants}
            </Text>))
          }
          <Button title="Current (ongoing) walk" onPress={() => this.props.navigation.navigate('CurrentEventToJoin')} />
        </View>
        <View>
          <Text>Global Stats (Week)</Text>
          <Text>Participants: {this.props.stats.global.week.participants}</Text>
        </View>
        <View>
          <Text>Previous walks in this area</Text>
          { this.props.previousEventsInArea.map(event => (
            <Text key={event.eventId}>
              End: {event.endTime}. Participant: {event.participants}
            </Text>))
          }
          <Button title="Previous walk" onPress={() => this.props.navigation.navigate('FinishedEventDetail')} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentUserLocation: state.user.location,
  currentEventsInArea: state.events.currentEventsInArea,
  previousEventsInArea: state.events.previousEventsInArea,
  stats: state.stats,
});

const mapDispatchToProps = dispatch => ({
  getLocationEvents: location => dispatch(getLocationEvents(location)),
  getLocationStats: location => dispatch(getLocationStats(location)),
});

Home.propTypes = {
  getLocationEvents: PropTypes.func.isRequired,
  getLocationStats: PropTypes.func.isRequired,
  currentUserLocation: PropTypes.objectOf(PropTypes.number).isRequired,
  currentEventsInArea: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  previousEventsInArea: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
  stats: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
