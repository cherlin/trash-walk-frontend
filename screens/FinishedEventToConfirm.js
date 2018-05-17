import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import Expo, { ImagePicker } from 'expo';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import moment from 'moment';
import { confirmEvent, cancelEvent } from '../actions/events';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  detailsContainer: {
    display: 'flex',
    height: 410,
  },
  dateText: {
    fontSize: 22,
    fontFamily: 'MontserratMedium',
    color: 'rgb(83, 173, 147)',
  },
  measureUnit: {
    fontSize: 36,
    fontFamily: 'MontserratSemiBold',
    color: 'rgb(164, 195, 198)',
  },
  measureDesc: {
    fontSize: 13,
    fontFamily: 'MontserratRegular',
    color: 'rgb(155, 155, 155)',
  },
  subHeading: {
    fontSize: 18,
    fontFamily: 'MontserratMedium',
    color: 'rgb(155, 155, 155)',
    marginBottom: 16,
  },
  cancelButton: {
    marginRight: 0,
    marginLeft: 16,
    height: 48,
    width: 163,
    borderRadius: 30,
    backgroundColor: '#A4C3C6',
    justifyContent: 'center',
  },
  confirmButton: {
    marginRight: 16,
    marginLeft: 0,
    height: 48,
    width: 163,
    borderRadius: 30,
    backgroundColor: '#53AD93',
    justifyContent: 'center',

  },
  addImage: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.15,
    width: 80,
    marginBottom: 60,
  },
});

const LATITUDE_DELTA = 0.00222;
const LONGITUDE_DELTA = 0.00121;

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
    const then = moment(new Date(this.props.activeEvent.startTime));
    const now = moment(new Date());
    const duration = moment.utc(moment(now).diff(moment(then))).format('H:mm');

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            region={{
              longitude:
                this.props.activeEvent.path[this.props.activeEvent.path.length - 1].longitude,
              latitude:
                this.props.activeEvent.path[this.props.activeEvent.path.length - 1].latitude,
              longitudeDelta: LONGITUDE_DELTA,
              latitudeDelta: LATITUDE_DELTA,
            }}
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
            <Polygon
              coordinates={this.props.activeEvent.snapshot.shape}
              strokeWidth={1}
              fillColor="rgba(83,173,147,0.15)"
              geodesic
              strokeColor="rgb(83,173,147)"
              zIndex={0}
            />
          </MapView>
        </View>
        <View style={styles.detailsContainer}>
          <View style={{ marginTop: 21, marginLeft: 16, marginBottom: 16 }}>
            <Text style={styles.dateText}>{moment(this.props.activeEvent.createdAt).format('DD MMM YYYY')}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 16, marginLeft: 16, marginBottom: 36 }}>
            <View>
              <Text style={styles.measureUnit}>{duration}</Text>
              <Text style={styles.measureDesc}>Time elapsed</Text>
            </View>
            <View>
              <Text style={styles.measureUnit}>{this.props.activeEvent.snapshot ? (this.props.activeEvent.snapshot.area / 100000).toFixed(2) : '0'} km</Text>
              <Text style={styles.measureDesc}>Area covered</Text>
            </View>
          </View>
          <View style={{ marginLeft: 16 }}>
            <Text style={styles.subHeading}>Add a picture</Text>
            <TouchableOpacity onPress={this.pickImage} style={styles.addImage}>
              <View style={{ backgroundColor: 'transparent' }}>
                {this.state.image ?
                  <Image
                    source={{ uri: this.state.image }}
                    style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    padding: 10,
                    }}
                  />
                  :
                  <View style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }}
                  />
                }
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              Button
              containerStyle={{ marginLeft: 0, marginRight: 0 }}
              fontFamily="MontserratBold"
              title="Cancel"
              buttonStyle={styles.cancelButton}
              onPress={this.cancelEvent}
            />
            <Button
              Button
              containerStyle={{ marginLeft: 0, marginRight: 0 }}
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
