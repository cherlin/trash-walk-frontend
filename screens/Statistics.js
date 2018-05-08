import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Statistics extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Statistics Screen</Text>
      </View>
    );
  }
}
