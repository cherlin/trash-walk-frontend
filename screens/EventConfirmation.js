import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import badgeImg from '../assets/images/badge-1.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#53AD93',
  },
  msgContainer: {
    marginTop: 128,
    display: 'flex',
    alignItems: 'center',
  },
  msgTitle: {
    color: '#fff',
    fontFamily: 'MontserratExtraBold',
    fontSize: 30,
  },
  msgSubTitle: {
    color: '#fff',
    fontFamily: 'MontserratMedium',
    fontSize: 18,
    marginTop: 8,
  },
  badgeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 80,
  },
  badgeImg: {
    marginBottom: 10,
  },
  badgeTitle: {
    color: '#397866',
  },
  btCool: {
    backgroundColor: '#fff',
    width: 288,
    height: 48,
    borderRadius: 30,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  btText: {
    color: '#53AD93',
    fontFamily: 'MontserratExtraBold',
    fontSize: 15,
  },
});

export default function EventConfirmation(props) {
  return (
    <View style={styles.container}>
      <View style={styles.msgContainer}>
        <Text style={styles.msgTitle}>Congratulations!</Text>
        <Text style={styles.msgSubTitle}>You won your first badge.</Text>
      </View>
      <View style={styles.badgeContainer}>
        <Image source={badgeImg} style={styles.badgeImg} />
        <Text style={styles.badgeTitle}>First Trash Walk</Text>
      </View>
      <TouchableOpacity style={styles.btCool} onPress={() => props.navigation.navigate('Home')}>
        <Text style={styles.btText}>Cool</Text>
      </TouchableOpacity>
    </View>
  );
}

EventConfirmation.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
