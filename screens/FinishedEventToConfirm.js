import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Button } from 'react-native';
import { getFinishedEvent } from '../actions/events';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

 class FinishedEventToConfirm extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>FinishedEventToConfirm Screen </Text>
        <Text>Start Time {this.props.event.startTime}</Text>
        <Text>Area Cleaned {this.props.event.personalAreaCovered}</Text>
        <Text>Distance Walked {this.props.event.personalDistanceWalked}</Text>
        <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')} />
        <Button title="Confirm" onPress={() => this.props.navigation.navigate('EventConfirmation')} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getFinishedEvent: eventId => dispatch(getFinishedEvent(eventId)),
});

const mapStateToProps = state => ({
  event: state.events.FinishedEventToConfirm,
});

export default connect(mapStateToProps, mapDispatchToProps)(FinishedEventToConfirm);

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
