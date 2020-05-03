import React from 'react'
import PropTypes from 'prop-types'
import { login } from '../reducers/authReducer'
import { useDispatch } from 'react-redux'

import { display, clear } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    event.target.username.value = ''

    try {
      await dispatch(login({ username, password }))
    } catch (error) {
      dispatch(display("Wrong Credentials"))
      setTimeout(() => {
        dispatch(clear())
      }, 5000);
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            name="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm