import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Button } from 'react-native';
import { joinEvent } from '../actions/events';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class CurrentEventToJoin extends React.Component {
  joinEvent = () => {
    this.props.joinEvent(this.props.user.id, this.props.navigation.getParam('eventId'), Date.now());
    this.props.navigation.navigate('ActiveEvent');
  }

  render() {
    const eventToJoin = this.props.events.find(event => event.id === this.props.navigation.getParam('eventId'));
    return (
      <View style={styles.container}>
        <Button title="< Go Back" onPress={() => this.props.navigation.goBack()} />
        <Text> Duration: {eventToJoin.startTime}</Text>
        <Text> Participants:{eventToJoin.participants}</Text>
        <Text> Area covered:{eventToJoin.areaCovered}</Text>
        <Button title="Join Event" onPress={this.joinEvent} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  joinEvent: (userId, eventId, startTime) => dispatch(joinEvent(userId, eventId, startTime)),
});

const mapStateToProps = state => ({
  events: state.events.activeEvents,
  user: state.user,
});

CurrentEventToJoin.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
  joinEvent: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentEventToJoin);
