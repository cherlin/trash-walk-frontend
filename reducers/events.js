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
};

const events = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_LOCATION_EVENTS_REQUEST':
      return { ...state, gettingLocationEvents: true };
    case 'GET_LOCATION_EVENTS_SUCCESS':
      return { ...state, gettingLocationEvents: false };
    case 'GET_LOCATION_EVENTS_FAILURE':
      return { ...state, gettingLocationEventsFailed: true };
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
