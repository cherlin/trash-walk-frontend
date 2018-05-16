import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getUserProfile } from '../actions/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
  },
  image: {
    width: 343,
    height: 152,
  },
  imageView: {
    width: 343,
    height: 152,
    padding: 0,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.15,
    elevation: 1,
  },
  textView: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    color: '#fff',
    fontFamily: 'MontserratSemiBold',
    fontSize: 14,
  },
});

class LastEvents extends React.Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.user.userId);
  }

  onPressEvent = (eventId) => {
    this.props.navigation.navigate('FinishedEventDetail', { eventId });
  }

  render() {
    return (
      <View style={styles.container}>
        { this.props.participations.length
          ? this.props.participations.map(event => (
            <TouchableHighlight key={event.id} onPress={() => this.onPressEvent(event.id)}>
              <View key={event.id} style={styles.imageView}>
                <ImageBackground source={require('../assets/images/last-walks-1.png')} style={styles.image} imageStyle={{ borderRadius: 2 }}>
                  <View style={styles.textView}>
                    <Text style={styles.text}>{event.distance > 1000 ? `${(event.distance / 1000).toFixed(1)} km` : `${event.distance} m` }</Text>
                    <Text style={styles.text}>{moment(event.endTime).fromNow()}</Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableHighlight>
            ))
          : <Text>You have no walks. Take a stroll maybe?</Text>
        }
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserProfile: userId => dispatch(getUserProfile(userId)),
});

const mapStateToProps = state => ({
  user: state.user,
  participations: state.user.participations,
});

LastEvents.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  participations: PropTypes.arrayOf(PropTypes.any).isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LastEvents);
