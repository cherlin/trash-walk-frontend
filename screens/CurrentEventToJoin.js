import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import { getCurrentEvent } from '../actions/events';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class CurrentEventToJoin extends React.Component {
  componentDidMount() {
    setInterval(
      () =>
        this.props.getCurrentEvent(this.props.event.eventId),
      2000,
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="< Go Back" onPress={() => this.props.navigation.goBack()} />
        <Text> Duration: {this.props.event.startTime}</Text>
        <Text> Participants:{this.props.event.noOfParticipants}</Text>
        <Text> Area covered:{this.props.event.areaCovered}</Text>
        <Button title="Join Event" onPress={() => this.props.navigation.navigate('ActiveEvent')} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCurrentEvent: eventId => dispatch(getCurrentEvent(eventId)),
});

const mapStateToProps = state => ({
  event: state.events.CurrentEventToJoin,
});

CurrentEventToJoin.propTypes = {
  getCurrentEvent: PropTypes.func.isRequired,
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentEventToJoin);

/*
GET (query: currentLocation, eventId) - every 5 seconds:
* Coordinates for individual participants(?)
* startTime
* noOfParticipants
* areaCovered

STATE (Redux Store):
CurrentEventToJoin {
  event: {
    coveredAreaPolygon: [[],[],[]] // Coords for polygon?
    eventId: 123132n1kjk31
    startTime: 123123123,
    noOfParticipants: 16,
    areaCovered: 123134,
    participantLocations: [[1.234234, 1.123123123], [2.234234, 32.123123]] // ???
  }
}
*/
