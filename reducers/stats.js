const defaultState = {
  totalDistance: 12312312,
  totalParticipants: 1223,
  totalArea: 123123123123,
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
