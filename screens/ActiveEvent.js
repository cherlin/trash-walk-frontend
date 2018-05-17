import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import MapView, { Polyline } from 'react-native-maps';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEventDataToActiveEvent } from '../actions/events';
import { SERVER_BASE_URL } from '../middlewares/api';
import StopWatch from '../components/StopWatch';
import stopBt from '../assets/buttons/bt-stop.png';
import pauseBt from '../assets/buttons/bt-pause.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    marginBottom: 44,
  },
  detailsText: {
    color: '#a4c3c6',
    fontFamily: 'MontserratSemiBold',
    fontSize: 36,
    textAlign: 'center',
  },
  detailsTitle: {
    color: '#9b9b9b',
    fontFamily: 'MontserratRegular',
    fontSize: 13,
    textAlign: 'center',
  },
  btContainer: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    marginLeft: 80,
    marginRight: 80,
  },
  pauseBtContainer: {
    backgroundColor: '#E36060',
    width: 80,
    height: 80,
    borderRadius: 100,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopBtContainer: {
    backgroundColor: '#53ad93',
    width: 80,
    height: 80,
    borderRadius: 100,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = 0.00421;

class ActiveEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showsUserLocation: false,
      isMoving: false,
      stopwatchStart: true,
    };
  }

  componentDidMount() {
    BackgroundGeolocation.on('location', this.onLocation);
    BackgroundGeolocation.on('motionchange', this.onMotionChange);
    BackgroundGeolocation.on('http', this.onUpdateResponse);
    BackgroundGeolocation.resetOdometer();
    BackgroundGeolocation.configure({
      desiredAccuracy: 0,
      desiredOdometerAccuracy: 20,
      distanceFilter: 10,
      url: `${SERVER_BASE_URL}/event/update`,
      autoSync: true,
      stopOnTerminate: true,
      startOnBoot: false,
      httpRootProperty: '.',
      locationTemplate: '{ "lat":<%= latitude %>, "lng":<%= longitude %>, "timestamp":"<%= timestamp %>" }',
      // #### FOR DEVELOPMENT ####
      reset: true,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      // #### END: FOR DEVELOPMENT ####
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.eventId !== prevProps.eventId) {
      this.startEvent();
    }
  }

  componentWillUnmount() {
    BackgroundGeolocation.stop();
    BackgroundGeolocation.removeAllListeners();
  }

  onLocation = ({ coords: { latitude, longitude }, odometer }) => {
    this.setCenter({ latitude, longitude });
    if (this.state.isMoving) {
      this.props.addEventDataToActiveEvent({ latitude, longitude }, odometer);
    }
  };

  onUpdateResponse = (response) => {
    console.log(response);
  };

  onMotionChange = (isMoving) => {
    if (isMoving) {
      this.setState({ isMoving: true });
    }
  };

  setCenter({ latitude, longitude }) {
    if (!this.mapRef) { return; }

    this.mapRef.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }

  startEvent = async () => {
    await BackgroundGeolocation.setConfig({
      extras: { eventId: this.props.eventId, userId: this.props.userId },
    });
    await BackgroundGeolocation.start();
    this.setState({ showsUserLocation: true, stopwatchStart: true });
  };

  stopEvent = async () => {
    await BackgroundGeolocation.stop();
    await BackgroundGeolocation.removeAllListeners();
    this.props.navigation.navigate('FinishedEventToConfirm');
    this.setState({ stopwatchStart: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <MapView
            ref={(c) => { this.mapRef = c; }}
            style={{ flex: 1 }}
            showsUserLocation={this.state.showsUserLocation}
            followsUserLocation={false}
            scrollEnabled
            showsMyLocationButton={false}
            showsPointsOfInterest={false}
            showsScale={false}
            showsTraffic={false}
            toolbarEnabled={false}
          >
            <Polyline
              coordinates={this.props.activeEvent.path}
              strokeWidth={26}
              geodesic
              strokeColor="rgba(0,179,253, 0.6)"
              zIndex={0}
            />
          </MapView>
        </View>
        <View style={styles.detailsContainer}>
          <View>
            <StopWatch stopwatchStart={this.state.stopwatchStart} />
            <Text style={styles.detailsTitle}>Time Elapsed</Text>
          </View>
          <View>
            <Text style={styles.detailsText}>{this.props.activeEvent.snapshot.participants}</Text>
            <Text style={styles.detailsTitle}>Participants</Text>
          </View>
          <View>
            <Text style={styles.detailsText}>{this.props.activeEvent.snapshot.area}km</Text>
            <Text style={styles.detailsTitle}>Area Covered</Text>
          </View>
        </View>
        <View style={styles.btContainer}>
          <TouchableOpacity style={styles.pauseBtContainer} onPress={this.pauseEvent}>
            <Image source={pauseBt} style={styles.pauseBt} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.stopBtContainer} onPress={this.stopEvent}>
            <Image source={stopBt} style={styles.stopBt} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  activeEvent: state.events.activeEvent,
  eventId: state.events.activeEvent.id,
  userId: state.user.id,
});

const mapDispatchToProps = dispatch => ({
  addEventDataToActiveEvent:
    (location, distance) => dispatch(addEventDataToActiveEvent(location, distance)),
  pauseEvent: data => dispatch(pauseEvent(data)),
});

ActiveEvent.propTypes = {
  userId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  activeEvent: PropTypes.objectOf(PropTypes.any).isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
  addEventDataToActiveEvent: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveEvent);
