import { API } from '../middlewares/api';

export const getLocationEvents = location => ({
  type: 'GET_LOCATION_EVENTS',
  [API]: {
    endpoint: `/events?lat=${location.latitude}&lng=${location.longitude}`,
    method: 'GET',
  },
});

export const getCurrentEvent = eventId => ({
  type: 'GET_CURRENT_EVENT',
  [API]: {
    endpoint: `/event?eventId=${eventId}`,
    method: 'GET',
  },
});

export const getFinishedEvent = eventId => ({
  type: 'GET_FINISHED_EVENT',
  [API]: {
    endpoint: `/event?eventId=${eventId}`,
    method: 'GET',
  },
});
