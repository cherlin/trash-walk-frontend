import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    margin: 40,
  },
});

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Current walks in this area</Text>
        <Button title="Current (ongoing) walk" onPress={() => this.props.navigation.navigate('CurrentEventToJoin')} />
        <Text style={styles.header}>Home Screen</Text>
        <Text>Latest walks in this area</Text>
        <Button title="Previous walk" onPress={() => this.props.navigation.navigate('FinishedEventDetail')} />
      </View>
    );
  }
}
