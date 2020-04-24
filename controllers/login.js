const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })

  const passwordCorrect = user === null ? false : bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      "error": "username or password is incorrect"
    })
  }

  const userToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userToken, process.env.SECRET)

  response.send({ token, username: user.username, name: user.username })
})

module.exports = loginRouter