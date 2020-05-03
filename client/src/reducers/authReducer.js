import loginService from '../services/login'

const initialState = null

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOG_OUT':
      return initialState
    default:
      return state;
  }
}

export const login = ({ username, password }) => {
  return async dispatch => {
    try {
      const newUser = await loginService.login({ username, password })
      dispatch({
        type: 'LOGIN',
        payload: newUser
      })
    } catch (error) {
      throw new Error(error)
    }

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

export default authReducer