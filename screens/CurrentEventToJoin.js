import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function CurrentEventToJoin(props) {
  const { navigate, goBack } = props.navigation;
  return (
    <View style={styles.container}>
      <Button title="< Go Back" onPress={() => goBack()} />
      <Text>CurrentEventToJoin (id: {props.eventId}) Screen</Text>
      <Button title="Join Event" onPress={() => navigate('ActiveEvent')} />
    </View>
  );
}

const mapStateToProps = state => ({
  eventId: state.currentEvent.eventId,
});

CurrentEventToJoin.propTypes = {
  eventId: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
};

export default connect(mapStateToProps)(CurrentEventToJoin);

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
