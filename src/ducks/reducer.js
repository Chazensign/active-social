const initialState = {
  userId: 0,
  firstName: '',
  lastName: '',
  birthDate: '',
  profilePic: '',
  city: '',
  state: '',
  zip: 0,
  friends: [],
  events: []
}

const SET_USER = 'SET_USER'
const CLEAR_USER = 'CLEAR_USER'
const UPDATE_FRIENDS = 'UPDATE_FRIENDS'
const UPDATE_EVENTS = 'UPDATE_EVENTS'

export function setUser(userObj) {
  return {
    type: SET_USER,
    payload: userObj
  }
}

export function clearUser() {
  return {
    type: CLEAR_USER,
    payload: { ...initialState }
  }
}

export function updateFriends(friends) {
  return {
    type: UPDATE_FRIENDS,
    payload: friends
  }
}

export function updateEvents(events) {
  return {
    type: UPDATE_EVENTS,
    payload: events
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload }
    case CLEAR_USER:
      return { ...action.payload }
    case UPDATE_FRIENDS:
      return { ...state, friends: action.payload }
    case UPDATE_EVENTS:
      return { ...state, events: action.payload }

    default:
      return state
  }
}
