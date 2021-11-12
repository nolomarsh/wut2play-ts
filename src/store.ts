import { configureStore } from '@reduxjs/toolkit'

import currentUserReducer from './reducers/currentUserSlice'

const allReducers = {
  currentUser: currentUserReducer
}

const store = configureStore({ reducer: allReducers })

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch