import React from 'react';
import { StyleSheet, View } from 'react-native';
import ExampleMap from './ExampleMap';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <ExampleMap />
    </View>
  );
}

