import blogService from '../services/blogs'

const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_BLOGS':
      return action.payload
    case 'ADD_NEW':
      return [...state, action.payload]
    case 'LIKE':
      return action.payload
    case 'REMOVE':
      return action.payload
    default:
      return state
  }
}

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_ALL_BLOGS',
      payload: blogs
    })
  }
}

export const addnew = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_NEW',
      payload: newBlog
    })
  }
}

export const like = blog => {
  return async dispatch => {
    await blogService.update(blog)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'LIKE',
      payload: blogs
    })
  }
}

export const remove = blog => {
  return async dispatch => {
    if (window.confirm(`You want to delete ${blog.title}`)) {
      await blogService.remove(blog)
      const blogs = await blogService.getAll()
      dispatch({
        type: 'REMOVE',
        payload: blogs
      })
    }
  }
}

export default blogReducer