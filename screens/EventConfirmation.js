import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class EventConfirmation extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>EventConfirmation Screen</Text>
        <Text>Well Done!</Text>
        <Button title='Cool!' onPress={() => this.props.navigation.navigate('Home')} />
      </View>
    );
  }
}
