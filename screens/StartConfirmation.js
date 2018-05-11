import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createEvent } from '../actions/events';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class StartConfirmation extends React.Component {
  startEvent = () => {
    this.props.createEvent(this.props.userId);
    setTimeout(() => {
      this.props.navigation.navigate('ActiveEvent');
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="< Go Back" onPress={() => this.props.navigation.goBack()} />
        <Text>StartConfirmation Screen</Text>
        <Button title="Start a new Walk" onPress={this.startEvent} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
});

const mapDispatchToProps = dispatch => ({
  createEvent: userId => dispatch(createEvent(userId)),
});

StartConfirmation.propTypes = {
  createEvent: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartConfirmation);
