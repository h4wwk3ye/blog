import loginService from '../services/login'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'ALREADY_LOGGED_IN':
      return action.payload
    case 'LOG_OUT':
      return null
    default:
      break;
  }
}

export const login = ({ username, password }) => {
  return async dispatch => {
    const newUser = await loginService.login({ username, password })
    dispatch({
      type: 'LOGIN',
      payload: newUser
    })
  }
}

export const alreadyLoggedIn = user => {
  return dispatch => {
    dispatch({
      type: 'ALREADY_LOGGED_IN',
      payload: user
    })
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch({
      type: 'LOG_OUT'
    })
  }
}

export default userReducer