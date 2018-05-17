import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import { createEvent } from '../actions/events';
import backBt from '../assets/menu/bt-back.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: -1,
  },
  backBt: {
    marginTop: 36,
    marginLeft: 16,
    position: 'absolute',
    zIndex: 1,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
  detailsContainer: {
    height: 267,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtContainer: {
    backgroundColor: '#53ad93',
    width: 80,
    height: 80,
    borderRadius: 100,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btText: {
    color: '#fff',
    fontFamily: 'MontserratBold',
    fontSize: 16,
  },
});

class StartConfirmation extends React.Component {
  startEvent = () => {
    this.props.createEvent(this.props.userId);
    this.props.navigation.navigate('ActiveEvent');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ zIndex: 1 }}
          onPress={() => this.props.navigation.goBack()}
        >
          <Image source={backBt} style={styles.backBt} />
        </TouchableOpacity>
        <View style={styles.mapContainer}>
          <MapView
            ref={(c) => { this.mapRef = c; }}
            style={{ flex: 1 }}
            showsUserLocation
            followsUserLocation={false}
            scrollEnabled
            showsMyLocationButton={false}
            showsPointsOfInterest={false}
            showsScale={false}
            showsTraffic={false}
            toolbarEnabled={false}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.btContainer}>
            <TouchableOpacity style={styles.startBtContainer} onPress={this.startEvent}>
              <Text style={styles.btText}>Start Walk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
});

const mapDispatchToProps = dispatch => ({
  createEvent: userId => dispatch(createEvent(userId)),
});

StartConfirmation.propTypes = {
  createEvent: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartConfirmation);
