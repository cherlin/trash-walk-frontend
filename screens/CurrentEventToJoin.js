import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class CurrentEventToJoin extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="< Go Back" onPress={() => this.props.navigation.goBack()} />
        <Text>CurrentEventToJoin Screen</Text>
        <Button title="Join Event" onPress={() => this.props.navigation.navigate('ActiveEvent')} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  event: state.events.CurrentEventToJoin,
});

export default connect(mapStateToProps, null)(CurrentEventToJoin);

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
