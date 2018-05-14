import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import Expo, { ImagePicker } from 'expo';
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
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  confirmEvent = () => {
    this.props.confirmEvent(this.props.userId, this.props.eventId, this.props.distance);
    this.props.navigation.navigate('EventConfirmation');
  }

  pickImage = async () => {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('You have to allow access to your camera roll to be able to upload images. Go to your Settings and allow the app access.');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: 'Images',
        aspect: [4, 3],
        base64: true,
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
        const base64Img = `data:image/jpg;base64,${result.base64}`;
        const apiUrl = 'https://api.cloudinary.com/v1_1/cherlin/image/upload';

        const data = {
          file: base64Img,
          upload_preset: 'sux9skjp',
        };

        fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
        }).then(res => res.json())
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
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
        <TouchableOpacity onPress={this.pickImage} style={{ width: 200, alignSelf: 'center' }}>
          <View style={{ backgroundColor: 'transparent' }}>
            {this.state.image ?
              <Image
                source={{ uri: this.state.image }}
                style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                alignSelf: 'center',
                }}
              />
              :
              <View style={{
                backgroundColor: 'grey',
                width: 200,
                height: 200,
                borderRadius: 100,
              }}
              />
            }
          </View>
        </TouchableOpacity>
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
