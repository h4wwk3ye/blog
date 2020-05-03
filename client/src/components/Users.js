import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import UserBlogs from './UserBlogs'
import BlogDetails from './BlogDetails'

import { useSelector } from 'react-redux'

export default function Users() {
  const [users, setUsers] = useState([])
  const blogs = useSelector(state => state.blogs)
  useEffect(() => {
    let isMounted = true
    async function fetchUsers() {
      if (isMounted) {
        const users = await userService.getAll()
        setUsers(users)
      }
    }
    fetchUsers()
    return function cleanup() {
      isMounted = false
    }
  }, [])

  const usermatch = useRouteMatch('/users/:id')
  const user = usermatch ? users.find(user => user.id.toString() === usermatch.params.id.toString()) : null

  const blogmatch = useRouteMatch('/blogs/:id')
  const blog = blogmatch ? blogs.find(blog => blog.id.toString() === blogmatch.params.id.toString()) : null

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
          {users.map((user, i) =>
            <tr key={i}>
              <td>
                <Link to={`/users/${user.id.toString()}`}>
                  {user.name}
                </Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Switch>
        <Route path='/users/:id'>
          <UserBlogs user={user} />
        </Route>
        <Route path='/blogs/:id'>
          <BlogDetails blog={blog} />
        </Route>
      </Switch>

    </div>
  )
}
