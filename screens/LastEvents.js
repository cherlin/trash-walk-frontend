import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserProfile } from '../actions/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class LastEvents extends React.Component {
  componentDidMount() {
    this.props.getUserProfile(this.props.user.userId);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>LastEvents Screen</Text>
        { this.props.lastWalks.map(event => (
          <Text key={event.eventId}>
            Finished Date: {event.endTime} Participant: {event.participants}
          </Text>
        ))
      }
        <Button
          title="Earlier walk"
          onPress={() => this.props.navigation.navigate('FinishedEventDetail')}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserProfile: userId => dispatch(getUserProfile(userId)),
});

const mapStateToProps = state => ({
  user: state.user.userInfo,
  lastWalks: state.user.lastWalks,
});

LastEvents.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  lastWalks: PropTypes.arrayOf(PropTypes.any).isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LastEvents);
