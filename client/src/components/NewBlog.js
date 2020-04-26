import React, { useState } from 'react'

export default function NewBlog({ addBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    addBlog({
      title, author, url
    })
  }

  return (
    <form onSubmit={handleCreate}>
      <h2>Creat new:</h2>
      <p>Title:
        <input
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

      </p>
      <p>Author:
        <input
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />

      </p>
      <p>Url:
        <input
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />

      </p>
      <button type="submit">create</button>
    </form>
  )
}
