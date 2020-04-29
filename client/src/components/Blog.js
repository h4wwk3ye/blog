import React, { useState } from 'react'

export default function Blogs({ blog, increaseLike, removeBlog, user }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const handleClick = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    increaseLike(blog)
  }

  const handleRemove = event => {
    event.preventDefault()
    removeBlog(blog)
  }

  return (
    !visible ?
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={handleClick}>view</button>
      </div>
      :
      <div style={blogStyle}>
        <div>{blog.title} <button onClick={handleClick}>hide</button> </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLike}>like</button> </div>
        <div>{blog.author}</div>
        {
          user.id.toString() === blog.user.toString() ?
            <button onClick={handleRemove}>remove</button>
            : null
        }

      </div>

  )
}
