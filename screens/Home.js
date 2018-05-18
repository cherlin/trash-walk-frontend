import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import PropTypes from 'prop-types';
import { getLocationEvents } from '../actions/events';
import { getLocationStats } from '../actions/stats';

import currentWalkImg from '../assets/images/current-walk-1.png';
import lastWalkImg from '../assets/images/last-walk-1.png';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 38,
  },
  header: {
    color: '#53AD93',
    fontFamily: 'MontserratMedium',
    fontSize: 22,
    marginBottom: 16,
  },
  cardContainer: {
    width: 304,
    height: 152,
    backgroundColor: 'lightgrey',
    borderRadius: 13,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  cardInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: 8,
  },
  cardInfoText: {
    color: '#fff',
    fontFamily: 'MontserratSemiBold',
    fontSize: 15,
  },
  noCurrentWalkText: {
    color: '#fff',
    fontFamily: 'MontserratSemiBold',
    fontSize: 15,
  },
  currentWalkImgContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  currentWalkImg: {
    borderRadius: 13,
  },
  currentWalkInfo: {
    color: '#fff',
    fontFamily: 'MontserratSemiBold',
    fontSize: 16,
  },
  statsContainer: {
    width: 304,
    height: 224,
    backgroundColor: '#fff',
    borderRadius: 13,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 24,
  },
  statsInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  statsInfoTitle: {
    color: '#9B9B9B',
    fontFamily: 'MontserratRegular',
    fontSize: 13,
  },
  statsInfoDetails: {
    color: '#A4C3C6',
    fontFamily: 'MontserratBold',
    fontSize: 32,
  },
  statsInfoDetailsUnit: {
    color: '#A4C3C6',
    fontFamily: 'MontserratBold',
    fontSize: 20,
    lineHeight: 30,
  },
  statsInfoDetailsUnitSquare: {
    color: '#A4C3C6',
    fontFamily: 'MontserratBold',
    fontSize: 16,
    lineHeight: 18,
  },
  lastWalkImgContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lastWalkImg: {
    borderRadius: 13,
  },
});

class Home extends React.Component {
  componentDidMount() {
    this.props.getLocationEvents(this.props.currentUserLocation);
    this.props.getLocationStats(this.props.currentUserLocation);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <View>
          <Text style={styles.header}>Current Walks</Text>
          { this.props.ongoingEventsAtLocation.length
            ? this.props.ongoingEventsAtLocation.map(event => (
              <View key={event.id}>
                <Text style={styles.cardInfoText}>
                Start: {event.startTime}. Participants: {event.participants}
                </Text>
                <Button title="Current (ongoing) walk" onPress={() => navigate('CurrentEventToJoin', { eventId: event.id })} />
              </View>)) :
            <View style={styles.cardContainer}>
              <View style={styles.currentWalkImgContainer}>
                <Image source={currentWalkImg} style={styles.currentWalkImg} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardInfoText}>6 Participants</Text>
                <Text style={styles.cardInfoText}>Started 15 min ago</Text>
              </View>
            </View>
            }
        </View>

        <View>
          <Text style={styles.header}>Global Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statsInfo}>
              <Text style={styles.statsInfoDetails}>
                {this.props.stats.totalParticipants}
              </Text>
              <Text style={styles.statsInfoTitle}>Participants</Text>
            </View>
            <View style={styles.statsInfo}>
              <Text style={styles.statsInfoDetails}>
                {this.props.stats.totalDistance ? (this.props.stats.totalDistance / 1000).toFixed(1) : 0}
                <Text style={styles.statsInfoDetailsUnit}> km</Text>
              </Text>
              <Text style={styles.statsInfoTitle}>Total Distance</Text>
            </View>
            <View style={styles.statsInfo}>
              <Text style={styles.statsInfoDetails}>
                {this.props.stats.totalArea ? (this.props.stats.totalArea / 1000000).toFixed(2) : 0}
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Text style={styles.statsInfoDetailsUnit}> km</Text>
                  <Text style={styles.statsInfoDetailsUnitSquare}>2</Text>
                </View>
              </Text>
              <Text style={styles.statsInfoTitle}>Total Area Cleaned</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.header}>Last Walks in this Area</Text>
          { this.props.pastEventsAtLocation.length
            ? this.props.pastEventsAtLocation.map(event => (
              <View key={event.id}>
                <Text style={styles.cardInfoText}>
                Start: {event.startTime}. Participants: {event.participants}
                </Text>
                <Button title="Current (ongoing) walk" onPress={() => navigate('FinishedEventDetail', { eventId: event.id })} />
              </View>)) :
            <TouchableOpacity style={styles.cardContainer} onPress={() => this.props.navigation.navigate('FinishedEventDetail')}>
              <View style={styles.lastWalkImgContainer}>
                <Image source={lastWalkImg} style={styles.lastWalkImg} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardInfoText}>11 Participants</Text>
                <Text style={styles.cardInfoText}>6 days ago</Text>
              </View>
            </TouchableOpacity>
            }
        </View>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserLocation: state.user.location,
  ongoingEventsAtLocation: state.events.ongoingEventsAtLocation,
  pastEventsAtLocation: state.events.pastEventsAtLocation,
  stats: state.stats,
});

const mapDispatchToProps = dispatch => ({
  getLocationEvents: location => dispatch(getLocationEvents(location)),
  getLocationStats: location => dispatch(getLocationStats(location)),
});

Home.propTypes = {
  getLocationEvents: PropTypes.func.isRequired,
  getLocationStats: PropTypes.func.isRequired,
  currentUserLocation: PropTypes.objectOf(PropTypes.number).isRequired,
  ongoingEventsAtLocation: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  pastEventsAtLocation: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
  stats: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
