import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'


function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const newBlogRef = React.createRef()

  // for initalising blogs
  useEffect(() => {
    let isMounted = true
    async function fetchBlogs() {
      let blogs = await blogService.getAll()

      blogs = blogs.sort((a, b) => parseInt(b.likes) - parseInt(a.likes))
      if (isMounted) setBlogs(blogs)
    }
    fetchBlogs()
    return function cleanup() {
      isMounted = false
    }
  }, [])

  // for setting user 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async newBlog => {
    newBlogRef.current.toggleVisibility()
    const blog = await blogService.create(newBlog)
    setBlogs([...blogs, blog])
  }

  const increaseLike = async blog => {
    const newBlog = await blogService.update(blog)
    const newBlogs = blogs.map(blog => blog.id === newBlog.id ? newBlog : blog)
    setBlogs(newBlogs)
  }

  const removeBlog = async blog => {
    if (window.confirm(`You want to delete ${blog.title}`)) {
      await blogService.remove(blog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }

  return (
    <div>
      <div>
        {errorMessage ?
          <Notification message={errorMessage} /> :
          null
        }
      </div>
      <div>
        {
          user === null ?
            <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} /> :
            <div>
              <h2>Blogs</h2>
              <p>{user.name} logged in</p>
              <div>
                {blogs.map(blog => <Blog
                  key={blog.id}
                  blog={blog}
                  increaseLike={increaseLike}
                  removeBlog={removeBlog}
                  user={user}
                />)}
              </div>
              <Togglable buttonLabel='Creat new' ref={newBlogRef}>
                <NewBlog addBlog={addBlog} />
              </Togglable>

              <button onClick={handleLogout}>Log out</button>
            </div>
        }
      </div>
    </div>
  )
}

export default App
