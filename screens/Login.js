import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Facebook } from 'expo';
import { Button } from 'react-native-elements';
import { loginUser } from '../actions/user';
const backgroundImage  = require('../assets/images/login-bg.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
    marginRight: 30,
  },
  login_button__fb: {
    backgroundColor: '#3D5A96',
    height: 60,
    width: 310,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 30,
  },
  backgroundImage: {
    alignItems: 'flex-end',
    flex: 2,
  },
  text: {
    color: '#fff',
    fontFamily: 'MontserratRegular',
    fontSize: 25,

  },
  text_header: {
    color: '#fff',
    fontFamily: 'MontserratExtraBold',
    fontSize: 50,

  },
  text_bottom: {
    color: '#fff',
    fontFamily: 'MontserratRegular',
    fontSize: 14,

  },
  innerview: {
    marginBottom: 400,
  },
});

class Login extends React.Component {
  loginUser = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('183106652514834', {
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
          this.props.navigation.navigate('Home');
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.innerview}>
            <Text style={styles.text_header}>Trash Walk</Text>
            <Text style={styles.text}>    keep the earth clean</Text>
          </View>
          <Button
            title="Continue without login"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
            Button
            icon={{
            name: 'facebook',
            type: 'font-awesome',
          }}
            fontFamily="MontserratBold"
            title="Login with Facebook"
            buttonStyle={styles.login_button__fb}
            onPress={this.loginUser}
          />
          <Text style={styles.text_bottom}>    Already have an account? Log in.</Text>

        </View>
      </ImageBackground>

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
