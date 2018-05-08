import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class FinishedEventToConfirm extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>FinishedEventToConfirm Screen</Text>
        <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')} />
        <Button title="Confirm" onPress={() => this.props.navigation.navigate('EventConfirmation')} />
      </View>
    );
  }
}

/*
GET (query: eventId, userId) - once:
* startTime
* endTime
* personalAreaCovered
* totalAreaCovered
* personalDistanceWalked
* totalDistanceWalked

POST:
1. If user adds picture, handle upload.
2. If user cancels - (eventId, userId) - "soft delete" participation?
3. If user confirms - (eventId, userId, comment).

STATE (Redux Store):
FinishedEventToConfirm {
  event: {
    eventId: 123132n1kjk31
    startTime: 123123123,
    endTime: 123123123,
    personalAreaCovered: 12313
    totalAreaCovered: 123123123
    personalDistanceWalked: 123123
    totalDistanceWalked: 1231333
  }
}
*/
