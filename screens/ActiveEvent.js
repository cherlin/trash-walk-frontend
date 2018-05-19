import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import MapView, { Polygon } from 'react-native-maps';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEventDataToActiveEvent, addResponseDataToActiveEvent } from '../actions/events';
import { SERVER_BASE_URL } from '../middlewares/api';
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

const LATITUDE_DELTA = 0.00222;
const LONGITUDE_DELTA = 0.00121;

class ActiveEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showsUserLocation: false,
      isMoving: false,
      minutes: 0,
      hours: 0,
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
    const res = JSON.parse(response.responseText);
    const polylinifiedShape = res.shape[0].map(arr => ({
      latitude: arr[1],
      longitude: arr[0],
    }));
    res.shape = polylinifiedShape;
    this.props.addResponseDataToActiveEvent(res);
  }

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
    this.setState({ showsUserLocation: true });
    this.timerId = setInterval(() => {
      if (this.state.minutes === 59) this.setState({ minutes: 0, hours: this.state.hours + 1 });
      this.setState({ minutes: this.state.minutes + 1 });
    }, 60000);
  };

  stopEvent = async () => {
    await BackgroundGeolocation.stop();
    await BackgroundGeolocation.removeAllListeners();
    clearInterval(this.timerId);
    this.props.navigation.navigate('FinishedEventToConfirm');
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
            <Polygon
              coordinates={this.props.activeEvent.snapshot.shape}
              strokeWidth={1}
              fillColor="rgba(83,173,147,0.70)"
              geodesic
              strokeColor="rgb(83,173,147)"
              zIndex={0}
            />
          </MapView>
        </View>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.detailsText}>{this.state.hours}:{this.state.minutes < 9 ? `0${this.state.minutes}` : this.state.minutes }</Text>
            <Text style={styles.detailsTitle}>Time Elapsed</Text>
          </View>
          <View>
            <Text style={styles.detailsText}>{this.props.activeEvent.snapshot ? this.props.activeEvent.snapshot.participants : '1'}</Text>
            <Text style={styles.detailsTitle}>Participants</Text>
          </View>
          <View>
            <Text style={styles.detailsText}>{this.props.activeEvent.snapshot ? (this.props.activeEvent.snapshot.area / 1000000).toFixed(2) : '0'} km</Text>
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
  addResponseDataToActiveEvent:
    response => dispatch(addResponseDataToActiveEvent(response)),
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
  addResponseDataToActiveEvent: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveEvent);
