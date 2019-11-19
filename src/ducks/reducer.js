const initialState = {
  userId: 0,
  firstName: '',
  lastName: '',
  birthDate: '',
  profilePic: '',
  city: '',
  zip: 0
}

const SET_USER = 'SET_USER'

export function setUser(userObj) {
  return {
    type: SET_USER,
    payload: userObj
  }
}


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload }
    
    default:
      return state
  }
}
