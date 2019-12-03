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

export function setUser(userObj) {
  return {
    type: SET_USER,
    payload: userObj
  }
}

export function clearUser() {
  return {
    type: CLEAR_USER,
    payload: {...initialState}
  }
}


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload }
    case CLEAR_USER:
      return {...action.payload}
    default:
      return state
  }
}
