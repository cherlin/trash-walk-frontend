const defaultState = {
  ongoingEventsAtLocation: [],
  pastEventsAtLocation: [],
  events: {},
  activeEvent: {
    confirmed: false,
    path: [],
    id: '',
    distance: 0, // Local distance. Calculated by geolocation module.
    snapshot: {
      id: '', // Participation ID (from POST /event/update)
      distance: 0, // Distance from server, calculated on geodata.
      area: 0, // Square meters covered.
      shape: [], // Current polygon.
      participants: '',
      startTime: '',
      endTime: '',
      EventId: '',
      UserId: '',
    },
  },
};

const events = (state = defaultState, action) => {
  switch (action.type) {
    // Fired of for Home Screen "Current walks in this area" and "Previous walks in this area"
    case 'GET_LOCATION_EVENTS_REQUEST':
      return { ...state, gettingLocationEvents: true };
    case 'GET_LOCATION_EVENTS_SUCCESS':
      return {
        ...state,
        gettingLocationEvents: false,
        pastEventsAtLocation: action.data,
      };
    case 'GET_LOCATION_EVENTS_FAILURE':
      return { ...state, gettingLocationEventsFailed: action.error };

    // Requests an event id to begin sending locations to.
    case 'CREATE_EVENT_REQUEST':
      return { ...state, creatingEvent: true };
    // If this succeeds, we empty the activeEvents path and distance.
    case 'CREATE_EVENT_SUCCESS':
      return {
        ...state,
        creatingEvent: false,
        activeEvent: {
          ...state.activeEvent,
          path: [],
          distance: 0,
          ...action.data,
        },
      };
    case 'CREATE_EVENT_FAILURE':
      return { ...state, creatingEvent: false, creatingEventFailed: action.error };

    case 'CONFIRM_EVENT_REQUEST':
      return { ...state, confirmingEvent: true };
    case 'CONFIRM_EVENT_SUCCESS':
      return {
        ...state,
        confirmingEvent: false,
        activeEvent: {
          ...state.activeEvent,
          snapshot: {
            ...defaultState.activeEvent.snapshot,
          },
          confirmed: true, // Maybe we should get the complete confirmed event back as a response.
        },
      };
    case 'CONFIRM_EVENT_FAILURE':
      return { ...state, confirmingEvent: false, confirmingEventFailed: action.error };

    // Continuously fired on active event, appending locations to the path drawn on the map.
    case 'ADD_EVENT_DATA_TO_ACTIVE_EVENT':
      return {
        ...state,
        activeEvent: {
          ...state.activeEvent,
          path: [...state.activeEvent.path, action.location],
          distance: action.distance,
        },
      };

    case 'ADD_RESPONSE_DATA_TO_ACTIVE_EVENT':
      return {
        ...state,
        activeEvent: {
          ...state.activeEvent,
          snapshot: { ...action.response },
        },
      };

    case 'JOIN_EVENT_REQUEST':
      return { ...state, joiningEvent: true };
    case 'JOIN_EVENT_SUCCESS':
      return {
        ...state,
        joiningEvent: false,
        activeEvent: {
          path: [],
          distance: 0,
          ...action.data,
        },
      };
    case 'JOIN_EVENT_FAILURE':
      return { ...state, joiningEventFailed: action.error };
    case 'GET_EVENT_REQUEST':
      return { ...state, gettingEvent: true };
    case 'GET_EVENT_SUCCESS':
      return {
        ...state,
        gettingEvent: false,
        events: {
          [action.data.event.id]: {
            ...action.data,
          },
        },
      };
    case 'GET_EVENT_FAILURE':
      return { ...state, gettingEventFailure: true };
    default:
      return state;
  }
};

export default events;
