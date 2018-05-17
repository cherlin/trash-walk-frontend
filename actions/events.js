import { API } from '../middlewares/api';

export const getLocationEvents = location => ({
  type: 'GET_LOCATION_EVENTS',
  [API]: {
    endpoint: `/events?lat=${location.latitude}&lng=${location.longitude}`,
    method: 'GET',
  },
});

export const addEventDataToActiveEvent = (location, distance) => ({
  type: 'ADD_EVENT_DATA_TO_ACTIVE_EVENT',
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

export const confirmEvent = (userId, eventId) => ({
  type: 'CONFIRM_EVENT',
  [API]: {
    endpoint: '/event/end',
    method: 'POST',
    body: {
      userId,
      eventId,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

export const cancelEvent = (userId, eventId) => ({
  type: 'CANCEL_EVENT',
  [API]: {
    endpoint: '/event',
    method: 'DELETE',
    body: {
      userId,
      eventId,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

export const getEvent = (eventId, userId) => ({
  type: 'GET_EVENT',
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
