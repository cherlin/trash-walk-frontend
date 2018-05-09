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
      eventId: null,
      image: '',
      participants: null,
      endTime: null,
    },
  ],
  currentEventsInArea: [
    {
      eventId: null,
      image: '',
      participants: null,
      startTime: null,
    },
  ],
};

const events = (state = defaultState, action) => {
  return state;
};

export default events;
