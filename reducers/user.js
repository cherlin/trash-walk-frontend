const defaultState = {
  location: {
    latitude: 2.13123,
    longitude: 42.13132,
  },
  userInfo: {
    userId: 23,
  },
  lastWalks: [
    {
      eventId: '123bsdf213',
      image: 'image',
      participants: 6,
      endTime: 120,
    },
  ],
  stats: {
    totalTime: 1234,
    totalDist: 1345,
  },
  badges: [
    {
      image: 'image',
      badgeId: 12,
      areaCovered: 13,
    },
  ],
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
