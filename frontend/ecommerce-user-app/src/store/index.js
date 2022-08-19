import { configureStore } from '@reduxjs/toolkit'
// import { createStore } from 'redux'
import rootReducer from '../reducers'

export default configureStore({
  reducer: rootReducer
})

// export default createStore({
//     reducer: rootReducer
// })
// createStore