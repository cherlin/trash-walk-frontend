import React from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getUser } from '../actions/user';

// Will be dynamic eventually, but for now - static image.
const image1 = require('../assets/images/last-walks-1.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 24,
  },
  image: {
    width: 343,
    height: 152,
  },
  imageView: {
    marginTop: 24,
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
  imageText: {
    color: '#fff',
    fontFamily: 'MontserratSemiBold',
    fontSize: 14,
  },
  text: {
    fontSize: 18,
    fontFamily: 'MontserratMedium',
    color: '#9b9b9b',
    marginBottom: 5,
  },
});

class LastEvents extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.user.id);
  }

  onPressEvent = (eventId) => {
    this.props.navigation.navigate('FinishedEventDetail', { eventId });
  }

  render() {
    return (
      this.props.participations.length
        ?
          <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: '#fff' }}>
            { this.props.participations.map(event => (
              <View key={event.id} style={styles.imageView}>
                <TouchableHighlight onPress={() => this.onPressEvent(event.id)}>
                  <ImageBackground
                    source={image1}
                    style={styles.image}
                    imageStyle={{ borderRadius: 2 }}
                  >
                    <View style={styles.textView}>
                      <Text style={styles.imageText}>{event.distance > 1000 ? `${(event.distance / 1000).toFixed(1)} km` : `${event.distance} m` }</Text>
                      <Text style={styles.imageText}>{moment(event.endTime).fromNow()}</Text>
                    </View>
                  </ImageBackground>
                </TouchableHighlight>
              </View>
              ))
            }
          </ScrollView>
        :
          <View style={[styles.container, { flex: 1, justifyContent: 'center' }]}>
            <Text style={styles.text}>You have no walks.</Text>
            <Text style={styles.text}>Take a stroll maybe?</Text>
          </View>

    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  participations: state.user.participations,
});

const mapDispatchToProps = dispatch => ({
  getUser: userId => dispatch(getUser(userId)),
});

LastEvents.propTypes = {
  participations: PropTypes.arrayOf(PropTypes.any).isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
  getUser: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LastEvents);
