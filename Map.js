
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Container,
  Button, Icon,
  Text,
  Header, Footer, Title,
  Left, Body, Right,
  Switch,
} from 'native-base';

import BackgroundGeolocation from 'react-native-background-geolocation';
import MapView from 'react-native-maps';

const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = 0.00421;
const TRACKER_HOST_URL = 'http://localhost:3000/';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272727',
  },
  header: {
    backgroundColor: '#fedd1e',
  },
  title: {
    color: '#000',
  },
  footer: {
    backgroundColor: '#fedd1e',
    paddingLeft: 10,
    paddingRight: 10,
  },
  footerBody: {
    justifyContent: 'center',
    width: 200,
    flex: 1,
  },
  icon: {
    color: '#fff',
  },
  map: {
    flex: 1,
  },
  status: {
    fontSize: 12,
  },
  markerIcon: {
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'rgba(0,179,253, 0.6)',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default class SimpleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: false,
      isMoving: false,
      motionActivity: { activity: 'unknown', confidence: 100 },
      odometer: 0,
      // MapView
      markers: [],
      coordinates: [],
      showsUserLocation: false,
    };
  }

  componentDidMount() {
    // Step 1:  Listen to events:
    BackgroundGeolocation.on('location', this.onLocation);
    BackgroundGeolocation.on('motionchange', this.onMotionChange);
    BackgroundGeolocation.on('activitychange', this.onActivityChange);
    BackgroundGeolocation.on('providerchange', this.onProviderChange);
    BackgroundGeolocation.on('powersavechange', this.onPowerSaveChange);

    // Step 2:  #configure:
    BackgroundGeolocation.configure({
      distanceFilter: 10,
      url: TRACKER_HOST_URL,
      httpRootProperty: 'data',
      locationTemplate: '{"lat":<%= latitude %>,"lng":<%= longitude %>, "isMoving":<%= is_moving %>, "odometer": <%= odometer %>}',
      extras: { eventId: 12345 },
      autoSync: true,
      stopOnTerminate: true,
      startOnBoot: false,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    }, (state) => {
      this.setState({
        enabled: state.enabled,
        isMoving: state.isMoving,
        showsUserLocation: state.enabled,
      });
    });
  }

  /**
  * @event location
  */
  onLocation = (location) => {
    console.log('[event] location: ', location);

    if (!location.sample) {
      this.addMarker(location);
      this.setState({
        odometer: (location.odometer / 1000).toFixed(1),
      });
    }
    this.setCenter(location);
  }

  /**
  * @event motionchange
  */
  onMotionChange = (event) => {
    console.log('[event] motionchange: ', event.isMovign, event.location);
    this.setState({
      isMoving: event.isMoving,
    });
  }

  /**
  * @event activitychange
  */
  onActivityChange = (event) => {
    console.log('[event] activitychange: ', event);
    this.setState({
      motionActivity: event,
    });
  }

  /**
  * @event providerchange
  */
  onProviderChange = (event) => {
    console.log('[event] providerchange', event);
  }

  /**
  * @event powersavechange
  */
  onPowerSaveChange = (isPowerSaveMode) => {
    console.log('[event] powersavechange', isPowerSaveMode);
  }

  onToggleEnabled = () => {
    const enabled = !this.state.enabled;

    this.setState({
      enabled,
      isMoving: false,
      showsUserLocation: false,
      coordinates: [],
      markers: [],
    });

    if (enabled) {
      BackgroundGeolocation.start(() => {
        // NOTE:  We tell react-native-maps to show location only AFTER BackgroundGeolocation
        // has requested location authorization.  If react-native-maps requests authorization first,
        // it will request WhenInUse -- "Permissions Tug-of-war"
        this.setState({
          showsUserLocation: true,
        });
      });
    } else {
      BackgroundGeolocation.stop();
    }
  }

  onClickGetCurrentPosition = () => {
    BackgroundGeolocation.getCurrentPosition((location) => {
      console.log('- getCurrentPosition success: ', location);
    }, (error) => {
      console.warn('- getCurrentPosition error: ', error);
    }, {
      persist: true,
      samples: 1,
    });
  }

  onClickChangePace = () => {
    console.log('- onClickChangePace');
    const isMoving = !this.state.isMoving;
    this.setState({ isMoving });
    BackgroundGeolocation.changePace(isMoving);
  }

  setCenter(location) {
    if (!this.refs.map) { return; }

    this.refs.map.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }

  addMarker = (location) => {
    const marker = {
      key: location.uuid,
      title: location.timestamp,
      heading: location.coords.heading,
      coordinate: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    };

    this.setState({
      markers: [...this.state.markers, marker],
      coordinates: [...this.state.coordinates, {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }],
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.title}>Simple Map</Title>
          </Body>
          <Right>
            <Switch onValueChange={this.onToggleEnabled} value={this.state.enabled} />
          </Right>
        </Header>

        <MapView
          ref="map"
          style={styles.map}
          showsUserLocation={this.state.showsUserLocation}
          followsUserLocation={false}
          scrollEnabled
          showsMyLocationButton={false}
          showsPointsOfInterest={false}
          showsScale={false}
          showsTraffic={false}
          toolbarEnabled={false}
        >
          <MapView.Polyline
            key="polyline"
            coordinates={this.state.coordinates}
            geodesic
            strokeColor="rgba(0,179,253, 0.6)"
            strokeWidth={60}
            zIndex={0}
          />
        </MapView>

        <Footer style={styles.footer}>
          <Left style={{ flex: 0.3 }}>
            <Button small info>
              <Icon active name="md-navigate" style={styles.icon} onPress={this.onClickGetCurrentPosition} />
            </Button>
          </Left>
          <Body style={styles.footerBody}>
            <Text style={styles.status}>{this.state.motionActivity.activity}:{this.state.motionActivity.confidence}% &middot; {this.state.odometer}km</Text>
          </Body>

          <Right style={{ flex: 0.25 }}>
            <Button small danger={this.state.isMoving} success={!this.state.isMoving} onPress={this.onClickChangePace}>
              <Icon active name={(this.state.isMoving) ? 'pause' : 'play'} style={styles.icon} />
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }
}
