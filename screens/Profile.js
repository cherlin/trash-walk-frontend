import React from 'react';
import { connect } from 'react-redux';
import ProfileTabNavigator from '../navigation/ProfileTabNavigator';
import Test from './test.js';
import { Text, View, StyleSheet } from 'react-native';

class Profile extends React.Component {
  render() {
    return(
    <ProfileTabNavigator />


    )
  }
}


const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
});


export default connect(mapStateToProps, null)(Profile);
/*
GET (query: userId):
* Last walks
* Stats
* Badges
*/
