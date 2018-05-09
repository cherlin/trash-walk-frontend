import React from 'react';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';

export default function Map(props) {
  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation={props.showUserLocation}
      followsUserLocation={props.followUser}
    />
  );
}

Map.defaultProps = {
  showUserLocation: false,
  followUser: false,
};

Map.propTypes = {
  showUserLocation: PropTypes.bool,
  followUser: PropTypes.bool,
};
