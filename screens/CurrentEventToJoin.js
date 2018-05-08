import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class CurrentEventToJoin extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="< Go Back" onPress={() => this.props.navigation.goBack()} />
        <Text>CurrentEventToJoin Screen</Text>
        <Button title="Join Event" onPress={() => this.props.navigation.navigate('ActiveEvent')} />
      </View>
    );
  }
}
