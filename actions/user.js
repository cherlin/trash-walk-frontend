import { API } from '../middlewares/api';

export const getUserProfile = userId => ({
  type: 'GET_USER_PROFILE',
  [API]: {
    endpoint: `/user?userId=${userId}`,
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
