import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class FinishedEventToConfirm extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>FinishedEventToConfirm Screen</Text>
        <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')} />
        <Button title="Confirm" onPress={() => this.props.navigation.navigate('EventConfirmation')} />
      </View>
    );
  }
}
