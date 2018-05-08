import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Login Screen</Text>
        <Button title="Sign up" onPress={() => this.props.navigation.navigate('Home')} />
      </View>
    );
  }
}
