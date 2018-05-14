const defaultState = {
  CurrentEventToJoin: {
    coveredAreaPolygon: [],
    eventId: 1,
    startTime: '',
    noOfParticipants: null,
    areaCovered: '',
    participantLocations: [],
  },
  FinishedEventDetail: {
    eventId: 333,
    startTime: null,
    endTime: null,
    personalAreaCovered: null,
    totalAreaCovered: null,
    personalDistanceWalked: null,
    totalDistanceWalked: null,
    eventImages: '',
    eventComments: '',
  },
  FinishedEventToConfirm: {
    eventId: null,
    startTime: null,
    endTime: null,
    personalAreaCovered: null,
    totalAreaCovered: null,
    personalDistanceWalked: null,
    totalDistanceWalked: null,
  },
  finishedEvents: [
    {
      id: '123sdf324sdff',
      participants: 12,
      startTime: 12312423423,
      firstLocation: [],
    },
  ],
  activeEvents: [
    {
      id: '123sdf324sdff',
      participants: 12,
      startTime: 12312423423,
      firstLocation: [],
    },
  ],
  currentEvent: {
    path: [],
    id: '',
    distance: 0,
  },
};

const events = (state = defaultState, action) => {
  switch (action.type) {
    // Fired of for Home Screen "Current walks in this area" and "Previous walks in this area"
    case 'GET_LOCATION_EVENTS_REQUEST':
      return { ...state, gettingLocationEvents: true };
    case 'GET_LOCATION_EVENTS_SUCCESS':
      return { ...state, gettingLocationEvents: false };
    case 'GET_LOCATION_EVENTS_FAILURE':
      return { ...state, gettingLocationEventsFailed: action.error };

    // Requests an event id to begin sending locations to.
    case 'CREATE_EVENT_REQUEST':
      return { ...state, creatingEvent: true };
    // If this succeeds, we empty the currentEvents path and distance.
    case 'CREATE_EVENT_SUCCESS':
      return {
        ...state,
        creatingEvent: false,
        currentEvent: {
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
        currentEvent: {
          ...state.currentEvent,
          confirmed: true, // Maybe we should get the complete confirmed event back as a response.
        },
      };
    case 'CONFIRM_EVENT_FAILURE':
      return { ...state, confirmingEvent: false, confirmingEventFailed: action.error };

    // Continuously fired on active event, appending locations to the path drawn on the map.
    case 'ADD_EVENT_DATA_TO_CURRENT_EVENT':
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          path: [...state.currentEvent.path, action.location],
          distance: action.distance,
        },
      };

    case 'GET_EVENT_REQUEST':
      return { ...state, gettingCurrentEvent: true };
    case 'GET_EVENT_SUCCESS':
      return { ...state, gettingCurrentEvent: false, ...action.data };
    case 'GET_EVENT_FAILURE':
      return { ...state, gettingCurrentEventFailure: true };
    default:
      return state;
  }
};

export default events;
