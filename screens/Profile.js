import React from 'react';
import { connect } from 'react-redux';
import ProfileTabNavigator from '../navigation/ProfileTabNavigator';
import { Text, View } from 'react-native';
import Test from './test.js';

class Profile extends React.Component {
  render() {
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <View style={{ flex: 1, position: absolute, top: 20, zIndex: 0 }}>
          <Text>Hello</Text>  
        </View>
        <View style={{ flex: 1 }}>
          <ProfileTabNavigator />
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
});


export default connect(mapStateToProps, null)(Profile);
/*
This file is currently not being rendered at all,
since the Main Tab Navigator links directly to the
ProfileTabNavigator.
*/
