import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

export default function Blogs({ blog, increaseLike, removeBlog, user }) {
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
      <tbody>
        <tr>
          <td>{blog.title}></td>
          <td>{blog.author}</td>
          <td> <Button onClick={handleClick}>view</Button></td>
        </tr>
      </tbody>
      :
      <tbody>
        <tr>
          <td>{blog.title} </td>

          <td><Button onClick={handleClick}>hide<br /></Button></td>

          <td>{blog.url}</td>

          <td> likes </td><td>{blog.likes}</td>
          <td><Button onClick={handleLike}>like</Button></td>

          <td>{blog.author}</td>
          {
            user.id.toString() === blog.user.id.toString() ?
              <td><Button onClick={handleRemove}>remove</Button></td>
              : null
          }
        </tr>
      </tbody>
  )
}
