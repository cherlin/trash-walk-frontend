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
  previousEventsInArea: [
    {
      eventId: '123bsdf213',
      image: 'image',
      participants: 6,
      endTime: 234234234,
    },
  ],
  currentEventsInArea: [
    {
      eventId: '123sdf324sdff',
      image: 'image',
      participants: null,
      startTime: null,
    },
  ],
  currentEvent: {
    path: [],
    id: 'initialEventID',
    distance: 0,
  },
};

const events = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_LOCATION_EVENTS_REQUEST':
      return { ...state, gettingLocationEvents: true };
    case 'GET_LOCATION_EVENTS_SUCCESS':
      return { ...state, gettingLocationEvents: false };
    case 'GET_LOCATION_EVENTS_FAILURE':
      return { ...state, gettingLocationEventsFailed: action.error };

    case 'CREATE_EVENT_REQUEST':
      return { ...state, creatingEvent: true };
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

    case 'ADD_EVENT_DATA_TO_CURRENT_EVENT':
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          path: [...state.currentEvent.path, action.location],
          distance: action.distance,
        },
      };

    case 'GET_CURRENT_EVENT_REQUEST':
      return { ...state, gettingCurrentEvent: true };
    case 'GET_CURRENT_EVENT_SUCCESS':
      return { ...state, gettingCurrentEvent: false, ...action.data };
    case 'GET_CURRENT_EVENT_FAILURE':
      return { ...state, gettingCurrentEventFailure: true };

    case 'GET_FINISHED_EVENT_REQUEST':
      return { ...state, gettingCurrentEvent: true };
    case 'GET_FINISHED_EVENT_SUCCESS':
      return { ...state, gettingCurrentEvent: false, ...action.data };
    case 'GET_FINISHED_EVENT_FAILURE':
      return { ...state, gettingCurrentEventFailure: true };
    default:
      return state;
  }
};

export default events;
