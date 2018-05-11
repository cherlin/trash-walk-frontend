import { API } from '../middlewares/api';

export const getUserProfile = userId => ({
  type : 'GET_USER_PROFILE',
  [API] : {
    endpoint: `/user?userId=${userId}`,
    method: 'GET',
  },
});
