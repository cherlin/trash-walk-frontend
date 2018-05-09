import { SERVER_BASE_URL } from '../config';

export const API = Symbol('API');

// const action = {
//   type: 'GET_USERS',
//   [API]: {
//     url: '/users'
//     method: 'POST',
//     body:
//   }
// }

export const api = store => next => (action) => {
  if (action[API]) {
    const {
      endpoint,
      method,
      body,
      headers,
    } = action[API];

    fetch(`${SERVER_BASE_URL}${endpoint}`, {
      method: 'GET' || method,
      body: JSON.stringify(body),
      ...headers,
    })
      .then(result => result.json())
      .then((data) => {
        store.dispatch({
          type: `${action.type}_SUCCESS`,
          data,
        });
      })
      .catch((error) => {
        store.dispatch({
          type: `${action.type}_FAILURE`,
          error,
        });
      });
    next({
      ...action,
      type: `${action.type}_REQUEST`,
    });
  } else {
    next(action);
  }
};
