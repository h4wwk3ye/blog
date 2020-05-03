import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from './reducers/authReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'loggedInUser',
  storage,
}

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  notification: notificationReducer,
  blogs: blogReducer
})

// const persistCombinedReducers = persistCombineReducers(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
  let persistor = persistStore(store)
  return { store, persistor }
}