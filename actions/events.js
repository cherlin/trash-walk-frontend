import { API } from '../middlewares/api';

export const getLocationEvents = location => ({
  type: 'GET_LOCATION_EVENTS',
  [API]: {
    endpoint: `/events?lat=${location.latitude}&lng=${location.longitude}`,
    method: 'GET',
  }
});