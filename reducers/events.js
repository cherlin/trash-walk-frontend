const defaultState = {
  CurrentEventToJoin: {
    coveredAreaPolygon: [],
    eventId: 12,
    startTime: 'today',
    noOfParticipants: 2,
    areaCovered: '50KM',
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
      participants: 12,
      startTime: 112312313,
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
    default:
      return state;
  }
};

export default events;
