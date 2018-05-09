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

class FinishedEventDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title='< Go Back' onPress={() => this.props.navigation.goBack()} />
        <Text>FinishedEventDetail Screen</Text>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  event: state.events.FinishedEventDetail,
});

export default connect(mapStateToProps, null)(FinishedEventDetail);

/*
GET (query: eventId, userId) - once:
* startTime
* endTime
* personalAreaCovered
* totalAreaCovered
* personalDistanceWalked
* totalDistanceWalked
* eventImages
* eventComments


STATE (Redux Store):
FinishedEventDetail: {
  event: {
    eventId: 123132n1kjk31
    startTime: 123123123,
    endTime: 123123123,
    personalAreaCovered: 12313
    totalAreaCovered: 123123123
    personalDistanceWalked: 123123
    totalDistanceWalked: 1231333
    eventImages
    eventComments
  }
}
*/
