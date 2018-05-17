import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
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
  statsContainer: {
    width: 304,
    height: 470,
    backgroundColor: '#fff',
    borderRadius: 13,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    marginTop: 40,
    marginLeft: 35,
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
    fontSize: 50,
  },
  statsInfoDetailsUnit: {
    color: '#A4C3C6',
    fontFamily: 'MontserratBold',
    fontSize: 30,
    lineHeight: 30,
  },
  statsInfoDetailsUnitSquare: {
    color: '#A4C3C6',
    fontFamily: 'MontserratBold',
    fontSize: 20,
    lineHeight: 18,
    paddingTop: 1,
  },
});

function Statistics(props) {
  const participations = props.participations.length;
  return (
    <View>
      <View style={styles.statsContainer}>
        <View style={styles.statsInfo}>
          <Text style={styles.statsInfoDetails}>
            {props.participations ? participations : '0'}
          </Text>
          <Text style={styles.statsInfoTitle}>Total Walks</Text>
        </View>
        <View style={styles.statsInfo}>
          <Text style={styles.statsInfoDetails}>
            { props.stats ? (props.stats.totalDistance / 1000).toFixed(1) : '0' }
            <Text style={styles.statsInfoDetailsUnit}> km</Text>
          </Text>
          <Text style={styles.statsInfoTitle}>Total Distance</Text>
        </View>
        <View style={styles.statsInfo}>
          <Text style={styles.statsInfoDetails}>
            {props.stats ? (props.stats.totalArea / 1000000).toFixed(2) : '0'}
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={styles.statsInfoDetailsUnit}> km</Text>
              <Text style={styles.statsInfoDetailsUnitSquare}>2</Text>
            </View>
          </Text>
          <Text style={styles.statsInfoTitle}>Total Area Cleaned</Text>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  stats: state.user.stats,
  participations: state.user.participations,
});

Statistics.propTypes = {
  stats: PropTypes.objectOf(PropTypes.any).isRequired,
  participations: PropTypes.arrayOf(PropTypes.any),
};

export default connect(mapStateToProps, null)(Statistics);
