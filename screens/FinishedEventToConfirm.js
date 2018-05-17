import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import Expo, { ImagePicker } from 'expo';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { confirmEvent, cancelEvent } from '../actions/events';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'flex-end',
  },

  cancelView: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  confirmView: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  cancelButton: {
    height: 48,
    width: 163,
    borderRadius: 30,
    backgroundColor: '#A4C3C6',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  confirmButton: {
    height: 48,
    width: 163,
    borderRadius: 30,
    backgroundColor: '#53AD93',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
    this.props.confirmEvent(this.props.user.id, this.props.activeEvent.id);
    this.props.navigation.navigate('EventConfirmation');
  }

  cancelEvent = () => {
    this.props.cancelEvent(this.props.user.id, this.props.activeEvent.id);
    this.props.navigation.navigate('Home');
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
                this.props.activeEvent.path[this.props.activeEvent.path.length - 1].latitude,
              longitude:
                this.props.activeEvent.path[this.props.activeEvent.path.length - 1].longitude,
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
              coordinates={this.props.activeEvent.path}
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
                width: 100,
                height: 100,
                borderRadius: 100,
                alignSelf: 'left',
                padding: 10,
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
        <View style={styles.footer}>
          <View style={styles.cancelView}>
            <Button
              Button
              icon={{
              name: 'cancelButton',
              type: 'font-awesome',
            }}
              fontFamily="MontserratBold"
              title="Cancel"
              buttonStyle={styles.cancelButton}
              onPress={this.cancelEvent}
            />
          </View>
          <View style={styles.confirmView}>
            <Button
              Button
              icon={{
              name: 'confirmButton',
              type: 'font-awesome',
            }}
              fontFamily="MontserratBold"
              title="Confirm"
              buttonStyle={styles.confirmButton}
              onPress={this.confirmEvent}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  activeEvent: state.events.activeEvent,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  confirmEvent: (userId, eventId) => dispatch(confirmEvent(userId, eventId)),
  cancelEvent: (userId, eventId) => dispatch(cancelEvent(userId, eventId)),
});

FinishedEventToConfirm.propTypes = {
  confirmEvent: PropTypes.func.isRequired,
  cancelEvent: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  activeEvent: PropTypes.objectOf(PropTypes.any).isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishedEventToConfirm);
