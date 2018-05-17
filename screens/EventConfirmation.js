import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function EventConfirmation(props) {
  return (
    <View style={styles.container}>
      <Text>EventConfirmation Screen</Text>
      <Text>Well Done!</Text>
      <Text>{props.confirmed ? 'CONFIRMED!' : 'NOT CONFIRMED'}</Text>
      <Button title="Cool!" onPress={() => props.navigation.navigate('Home')} />
    </View>
  );
}


const mapStateToProps = state => ({
  confirmed: state.events.activeEvent.confirmed,
});

EventConfirmation.propTypes = {
  confirmed: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(EventConfirmation);
