
// maybe  no need to define all properties but good to have for


const defaultState = {
  stats: {
    global: {
      week: {
        participants: null,
        timeSpent: null,
        areaCleaned: null,
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
    },
    national: {
      week: {
        participants: null,
        timeSpent: null,
        areaCleaned: null,
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
    },
    local: {
      week: {
        participants: null,
        timeSpent: null,
        areaCleaned: null,
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
    },
  },

};

const stats = (state = defaultState, action) => {
  return state;
};

export default stats;
