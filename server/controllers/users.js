const userRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcryptjs')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  // console.log(users)
  response.json(users.map(user => user.toJSON()))
})

userRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    return response
      .status(400)
      .json({ "error": "password must have min length of 5" })
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  let blogs = []
  blogs = await Blog.find({})
  blogs = blogs.map(blog => blog.id)

  const user = new User({
    name: body.name,
    username: body.username,
    passwordHash,
    blogs
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = userRouter