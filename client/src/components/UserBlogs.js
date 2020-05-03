import React from 'react'
import { Link } from "react-router-dom";

export default function UserBlogs({ user }) {
  if (!user) return null
  return (
    <div>
      <h2>Added Blogs</h2>
      <ul>
        {user.blogs.map((blog, i) =>
          <li key={i}>
            <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}
