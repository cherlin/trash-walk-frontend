import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class ActiveEvent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ActiveEvent Screen</Text>
        <Button title="Paus Event" onPress={() => console.log('Event Paused')} />
        <Button title="Stop Event" onPress={() => this.props.navigation.navigate('FinishedEventToConfirm')} />
      </View>
    );
  }
}
