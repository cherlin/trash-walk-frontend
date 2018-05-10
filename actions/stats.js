import { API } from '../middlewares/api';

export const getLocationStats = location => ({
  type: 'GET_LOCATION_STATS',
  [API] : {
    endpoint: `/stats?lat=${location.latitude}&lng=${location.longitude}`,
    method: 'GET',
  },
});
