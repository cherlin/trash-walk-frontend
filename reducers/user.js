const defaultState = {
  id: '7fa71780-4bb7-4c3e-b204-b39dea16d2cb',
  firstName: '',
  lastName: '',
  email: '',
  token: '',
  createdAt: '',
  updatedAt: '',
  badges: [],
  participations: [{
    id: '16076206-cfc2-47de-b8af-f15daca91aa1',
    UserId: '26076206-cfc2-47de-b8af-f15daca91aa2',
    EventId: '36076206-cfc2-47de-b8af-f15daca91aa3',
    startTime: '2018-02-12T01:00',
    endTime: '2018-02-12T02:00',
    distance: 1260,
  }],
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
