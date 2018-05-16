import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Statistics(props) {
  return (
    <View style={styles.container}>
      <Text>Total time contributed
        {props.stats.totalTime}
      </Text>
      <Text>Total distance covered
        {props.stats.totalDist}
      </Text>
    </View>
  );
}

const mapStateToProps = state => ({
  stats: state.user.stats,
});

Statistics.propTypes = {
  stats: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(Statistics);
