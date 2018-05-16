import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import { getEvent } from '../actions/events';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class FinishedEventDetail extends React.Component {
  componentDidMount() {
    this.props.getEvent(this.props.navigation.getParam('eventId'), this.props.user.id);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="< Go Back" onPress={() => this.props.navigation.goBack()} />
        <Text>FinishedEventDetail Screen</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  event: state.events.FinishedEventDetail,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getEvent: (eventId, userId) => dispatch(getEvent(eventId, userId)),
});

FinishedEventDetail.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
  getEvent: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishedEventDetail);
