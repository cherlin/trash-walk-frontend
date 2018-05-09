import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from '../components/Map';
import { SERVER_BASE_URL } from '../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class ActiveEvent extends React.Component {
  componentDidMount() {
    BackgroundGeolocation.ready({
      distanceFilter: 10,
      url: `${SERVER_BASE_URL}/location`,
      extras: { eventId: this.props.eventId },
      autoSync: true,
      stopOnTerminate: true,
      startOnBoot: false,
      // #### FOR DEVELOPMENT ####
      reset: true,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    });

    BackgroundGeolocation.start();
  }

  stopEvent = () => {
    BackgroundGeolocation.stop(() => {
      this.props.navigation.navigate('FinishedEventToConfirm');
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Map showUserLocation followUser />
        </View>
        <View style={{ height: 100, flexDirection: 'row', alignItems: 'center' }}>
          <Button title="Stop Event" onPress={this.stopEvent} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  event: state.events.CurrentEventToJoin,
});

ActiveEvent.defaultProps = {
  eventId: 'NOT SET',
};

ActiveEvent.propTypes = {
  eventId: PropTypes.string,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
};

export default connect(mapStateToProps, null)(ActiveEvent);

/*
POST:
1. Join event (once) - (body: currentLocation, eventId, userId). If OK:
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
