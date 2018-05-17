import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'MontserratMedium',
    color: '#9b9b9b',
    marginBottom: 5,
  },
  badge: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
          <View style={styles.container}>
            <Text style={styles.text}>No badges awarded yet.</Text>
            <Text style={styles.text}>Keep on going!</Text>
          </View>
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
