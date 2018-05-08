import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class ActiveEvent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ActiveEvent Screen</Text>
        <Button title="Paus Event" onPress={() => console.log('Event Paused')} />
        <Button title="Stop Event" onPress={() => this.props.navigation.navigate('FinishedEventToConfirm')} />
      </View>
    );
  }
}

/*
POST: 
1. Join event (once) - (body: currentLocation, eventId). If OK:
2. Locations... (every 5 seconds) - (body: locationData, eventId). When done:
3. End event (once) - (body: endEventData, eventId) . If OK: Navigate to FinishedEventToConfirm.

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