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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

class Home extends React.Component {
  componentDidMount() {
    this.props.getLocationEvents(this.props.currentUserLocation);
    this.props.getLocationStats(this.props.currentUserLocation);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Home Screen</Text>
        <View style={styles.container}>
          <Text style={styles.heading}>Current walks in this area</Text>
          { this.props.ongoingEventsAtLocation.length
            ? this.props.ongoingEventsAtLocation.map(event => (
              <View key={event.id}>
                <Text>
                Start: {event.startTime}. Participants: {event.participants}
                </Text>
                <Button title="Current (ongoing) walk" onPress={() => navigate('CurrentEventToJoin', { eventId: event.id })} />
              </View>
              ))
            : <Text>No current events in this area!</Text>
          }
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Stats</Text>
          <Text>Participants: {this.props.stats.totalParticipants}</Text>
          <Text>Total Distance: {this.props.stats.totalDistance ? this.props.stats.totalDistance.toFixed(0) : 0}</Text>
          <Text>Total Area Cleaned: {this.props.stats.totalArea ? this.props.stats.totalArea.toFixed(0) : 0}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Previous walks in this area</Text>
          { this.props.pastEventsAtLocation.map(event => (
            <Text key={event.id}>
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
  ongoingEventsAtLocation: state.events.ongoingEventsAtLocation,
  pastEventsAtLocation: state.events.pastEventsAtLocation,
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
  ongoingEventsAtLocation: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  pastEventsAtLocation: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
  stats: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
