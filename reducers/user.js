const defaultState = {
  firstName: '',
  lastName: '',
  profilePicture: '',
  email: '',
  updatedAt: '',
  createdAt: '',
  token: '',
  location: {
    latitude: 2.13123,
    longitude: 42.13132,
  },
  id: '26076206-cfc2-47de-b8af-f15daca91aa7',
  stats: {
    totalTime: null,
    totalDistance: null,
    totalArea: null,
  },
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_USER_PROFILE_REQUEST':
      return { ...state, gettingUserProfile: true };
    case 'GET_USER_PROFILE_SUCCESS':
      return { ...state, gettingUserProfile: false, ...action.data };
    case 'GET_USER_PROFILE_FAILURE':
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
