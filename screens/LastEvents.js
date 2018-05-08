import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class LastEvents extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>LastEvents Screen</Text>
        <Button title="Earlier walk" onPress={() => this.props.navigation.navigate('FinishedEventDetail')} />
      </View>
    );
  }
}
