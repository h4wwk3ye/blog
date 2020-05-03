import React from 'react'

export default function BlogDetails({ blog }) {
  if (!blog) return null;

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={`https://${blog.url}`}>{blog.url}</a>
      <p>likes {blog.likes}</p>
      <p>Added by {blog.author}</p>
    </div>
  )
}
