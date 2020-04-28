import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { login } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const LoginForm = ({ setUser, setErrorMessage }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    // console.log(username, password)
    try {

      dispatch(login({ username, password }))
      // console.log(user)

      if (user === undefined) throw new Error()

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
    } catch (error) {
      setErrorMessage("Wrong Credentials")
      setTimeout(() => {
        setErrorMessage(null)
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