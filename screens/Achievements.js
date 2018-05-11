import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Achievements extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Achievements Screen</Text>
        { this.props.badges.map(badge => (
          <Text key={badge.badgeId}>
            image: {badge.image} Covered: {badge.areaCovered} km
          </Text>
        ))
      }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  badges: state.user.badges,
});

export default connect(mapStateToProps, null)(Achievements);
