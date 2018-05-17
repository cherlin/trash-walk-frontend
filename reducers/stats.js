const defaultState = {
  totalDistance: null,
  totalParticipants: '0',
  totalArea: null,
};

const stats = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_LOCATION_STATS_REQUEST':
      return { ...state, gettingLocationStats: true };
    case 'GET_LOCATION_STATS_SUCCESS':
      return { ...state, ...action.data };
    case 'GET_LOCATION_STATS_FAILURE':
      return { ...state, gettingLocationStats: false, gettingLocationStatsFailed: true };
    default:
      return state;
  }
};

export default stats;
