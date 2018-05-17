import { API } from '../middlewares/api';

export const getUser = userId => ({
  type: 'GET_USER',
  [API]: {
    endpoint: `/user/${userId}`,
    method: 'GET',
  },
});

export const loginUser = data => ({
  type: 'LOGIN_USER',
  [API]: {
    endpoint: '/user',
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

export const toLocalStore = data => ({
  type: 'SAVE_TO_LOCALSTORE',
  data,
});
