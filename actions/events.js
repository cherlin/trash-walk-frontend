import { API } from '../middlewares/api';

export const getLocationEvents = location => ({
  type: 'GET_LOCATION_EVENTS',
  [API]: {
    endpoint: `/events?lat=${location.latitude}&lng=${location.longitude}`,
    method: 'GET',
  },
});

export const addEventDataToCurrentEvent = (location, distance) => ({
  type: 'ADD_EVENT_DATA_TO_CURRENT_EVENT',
  location,
  distance,
});

export const createEvent = userId => ({
  type: 'CREATE_EVENT',
  [API]: {
    endpoint: '/event',
    method: 'POST',
    body: { userId },
    headers: {
      'content-type': 'application/json',
    },
  },
});

export const confirmEvent = (userId, eventId, distance, endTime) => ({
  type: 'CONFIRM_EVENT',
  [API]: {
    endpoint: '/event/end',
    method: 'POST',
    body: {
      userId,
      eventId,
      distance,
      endTime,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

export const getEvent = (eventId, userId) => ({
  type: 'GET_CURRENT_EVENT',
  [API]: {
    endpoint: `/event?eventId=${eventId}&userId=${userId}`,
    method: 'GET',
  },
});

export const joinEvent = (userId, eventId, startTime) => ({
  type: 'JOIN_EVENT',
  [API]: {
    endpoint: '/event/join',
    method: 'POST',
    body: {
      userId,
      eventId,
      startTime,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  },
});
