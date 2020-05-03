const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'DISPLAY':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return null
  }
}

export const display = (message) => {
  return dispatch => {
    dispatch({
      type: 'DISPLAY',
      payload: message
    })
  }
}

export const clear = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR'
    })
  }
}

export default notificationReducer