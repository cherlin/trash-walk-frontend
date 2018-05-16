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
});

function Achievements(props) {
  return (
    <View style={styles.container}>
      { props.badges.length
        ? props.badges.map(badge => (
          <Image style={{ width: 50, height: 50 }} source={{ uri: badge.imageUrl }} />
          ))
        : <Text>No badges awarded yet! Keep on going.</Text>
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

export default connect(mapStateToProps, null)(Achievements);
