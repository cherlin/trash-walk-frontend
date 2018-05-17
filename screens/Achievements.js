import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import firstBadgeImg from '../assets/images/badge-small-1.png';
import inactiveBadgeImg from '../assets/images/badge-small-2.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontFamily: 'MontserratMedium',
    color: '#9b9b9b',
    marginBottom: 5,
  },
  badge: {
    width: 80,
    height: 80,
    borderRadius: 25,
  },
  badgesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 32,
  },
  singleBadgeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 2,
    marginBottom: 24,
  },
  badgeTitle: {
    color: '#9B9B9B',
    fontFamily: 'MontserratMedium',
    fontSize: 12,
    marginTop: 8,
  },
});

function Achievements(props) {
  return (
    <View style={styles.container}>
      { props.badges.length
        ?
          props.badges.map(badge => (
            <Image style={styles.badge} source={{ uri: badge.imageUrl }} />
          ))
        :
          <ScrollView contentContainerStyle={styles.badgesContainer}>
            <View style={styles.singleBadgeContainer}>
              <Image source={firstBadgeImg} />
              <Text style={styles.badgeTitle}>First Walk</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>5 Walks</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>10 Walks</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>Joined 1 Walk</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>Joined 5 Walks</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>Joined 10 Walks</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>1km Walk</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>3km Walk</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>5km Walk</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>10km Walk</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>15km Walk</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>20km Walk</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>25km Walk</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>30km Walk</Text>
            </View>
            <View style={styles.singleBadgeContainer}>
              <Image source={inactiveBadgeImg} />
              <Text style={styles.badgeTitle}>35km Walk</Text>
            </View>
          </ScrollView>
      }
    </View>
  );
}

Achievements.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

const mapStateToProps = state => ({
  badges: state.user.badges,
});

export default connect(mapStateToProps)(Achievements);
