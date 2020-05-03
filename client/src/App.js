import React, { useEffect } from 'react';
import './App.css';

import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'

import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from './reducers/authReducer'

import { getAllBlogs, like, addnew, remove } from './reducers/blogReducer'

import { Table } from 'react-bootstrap'

import { Button } from 'react-bootstrap'

function App() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  // const [blogs, setBlogs] = useState([])
  const blogs = useSelector(state => state.blogs)

  const errorMessage = useSelector(state => state.notification)
  const newBlogRef = React.createRef()

  useEffect(() => {
    let isMounted = true
    async function fetchBlogs() {
      if (isMounted)
        await dispatch(getAllBlogs())
    }
    fetchBlogs()
    return function cleanup() {
      isMounted = false
    }
  }, [dispatch])

  // for setting user token
  useEffect(() => {
    if (user && user.token) {
      blogService.setToken(user.token)
    }
  }, [user])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(logOut())
  }

  const addBlog = async newBlog => {
    newBlogRef.current.toggleVisibility()
    await dispatch(addnew(newBlog))
  }

  const increaseLike = async blog => {
    await dispatch(like(blog))
  }

  const removeBlog = async blog => {
    await dispatch(remove(blog))
  }

  return (
    <div className='container'>
      <div>
        {errorMessage ?
          <Notification message={errorMessage} /> :
          null
        }
      </div>
      <div>
        {
          !user || user.token === undefined ?
            <LoginForm /> :
            <div>
              <h2>Blogs</h2>
              <p>{user.name} logged in</p>
              <Table responsive>

                {blogs && blogs.map(blog =>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    increaseLike={increaseLike}
                    removeBlog={removeBlog}
                    user={user}
                  />)}

              </Table>
              <Togglable buttonLabel='Creat new' ref={newBlogRef}>
                <NewBlog addBlog={addBlog} />
              </Togglable>

              <Button onClick={handleLogout}>Log out</Button>
            </div>
        }
      </div>
      <Users />
    </div>
  )
}

export default App
