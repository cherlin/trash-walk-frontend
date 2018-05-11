import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import PropTypes from 'prop-types';
import { confirmEvent } from '../actions/events';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = 0.00421;

class FinishedEventToConfirm extends React.Component {
  confirmEvent = () => {
    this.props.confirmEvent(this.props.userId, this.props.eventId, this.props.distance);
    setTimeout(() => {
      this.props.navigation.navigate('EventConfirmation');
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 3, flexDirection: 'row' }}>
          <MapView
            region={{
              latitude:
                this.props.currentEvent.path[this.props.currentEvent.path.length - 1].latitude,
              longitude:
                this.props.currentEvent.path[this.props.currentEvent.path.length - 1].longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            ref={(c) => { this.mapRef = c; }}
            style={{ flex: 1 }}
            showsUserLocation={false}
            followsUserLocation={false}
            scrollEnabled
            showsMyLocationButton={false}
            showsPointsOfInterest={false}
            showsScale
            showsTraffic={false}
            toolbarEnabled={false}
          >
            <Polyline
              coordinates={this.props.currentEvent.path}
              strokeWidth={26}
              geodesic
              strokeColor="rgba(0,179,253, 0.6)"
              zIndex={0}
            />
          </MapView>
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')} />
          <Button title="Confirm" onPress={this.confirmEvent} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentEvent: state.events.currentEvent,
  eventId: state.events.currentEvent.id,
  distance: state.events.currentEvent.distance,
  userId: state.user.id,
});

const mapDispatchToProps = dispatch => ({
  confirmEvent: (userId, eventId, distance) => dispatch(confirmEvent(userId, eventId, distance)),
});

FinishedEventToConfirm.propTypes = {
  confirmEvent: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
  currentEvent: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishedEventToConfirm);
