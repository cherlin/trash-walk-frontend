const defaultState = {
  location: {
    latitude: 2.13123,
    longitude: 42.13132,
  },
  id: '26076206-cfc2-47de-b8af-f15daca91aa7',
  firstName: '',
  lastName: '',
  email: '',
  badges: [],
  participations: [],
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
    default:
      return state;
  }
};

export default user;
