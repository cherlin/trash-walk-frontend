import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Statistics extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Statistics Screen</Text>
        <Text>Total time contributed
        {this.props.stats.totalTime}
        </Text>
        <Text>Total distance covered
          {this.props.stats.totalDist}
        </Text>

      </View>
    );
  }
}

const mapStateToProps = state => ({
  stats: state.user.stats,
});

export default connect(mapStateToProps, null)(Statistics);
