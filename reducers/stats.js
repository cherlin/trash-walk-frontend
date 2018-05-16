const defaultState = {
  week: {
    distance: 12313,
    participants: 13,
    timeSpent: 144,
    areaCleaned: 123123,
  },
  month: {
    participants: null,
    timeSpent: null,
    areaCleaned: null,
  },
  year: {
    participants: null,
    timeSpent: null,
    areaCleaned: null,
  },
};

const stats = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_LOCATION_STATS_REQUEST':
      return { ...state, gettingLocationStats: true };
    case 'GET_LOCATION_STATS_SUCCESS':
      return { ...state, gettingLocationStats: false, ...action.data };
    case 'GET_LOCATION_STATS_FAILURE':
      return { ...state, gettingLocationStats: false, gettingLocationStatsFailed: true };
    default:
      return state;
  }
};

export default stats;
