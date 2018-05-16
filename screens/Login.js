import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Facebook } from 'expo';
import { loginUser } from '../actions/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Login extends React.Component {
  loginUser = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(183106652514834, {
      permissions: ['public_profile', 'email'],
    });

    if (type === 'success') {
      fetch(
        'https://graph.facebook.com/me?' +
        'fields=id,first_name,last_name,email,picture.width(500).height(500)',
        {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        },
      )
        .then(res => res.json())
        .then((result) => {
          const req = {
            email: result.email,
            firstName: result.first_name,
            lastName: result.last_name,
            token,
          };
          this.props.serverAuth(req);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login Screen</Text>
        <Button title="Sign up" onPress={() => this.props.navigation.navigate('Home')} />
        <Button title="Login with facebook" onPress={this.loginUser} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  serverAuth: data => dispatch(loginUser(data)),
});

Login.propTypes = {
  serverAuth: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.any),
  ])).isRequired,

};

export default connect(null, mapDispatchToProps)(Login);
