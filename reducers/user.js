const defaultState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  token: '',
  createdAt: '',
  updatedAt: '',
  badges: [],
  participations: [],
  stats: {
    totalDistance: null,
    totalArea: null,
  },
  location: {
    latitude: 2.13123,
    longitude: 42.13132,
  },
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_USER_REQUEST':
      return { ...state, gettingUserProfile: true };
    case 'GET_USER_SUCCESS':
      return { ...state, gettingUserProfile: false, ...action.data };
    case 'GET_USER_FAILURE':
      return { ...state, gettingUserProfile: false, gettingUserProfileFailed: true };
    case 'LOGIN_USER_REQUEST':
      return { ...state, loginUser: true };
    case 'LOGIN_USER_SUCCESS':
      return { ...state, ...action.data };
    case 'LOGIN_USER_FAILURE':
      return { ...state, loginUser: false };
    case 'SAVE_TO_LOCALSTORE':
      return { ...state, localStorage: { ...action.data } };
    default:
      return state;
  }
};

export default user;
