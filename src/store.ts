import { configureStore } from '@reduxjs/toolkit'

import currentUserReducer from './reducers/currentUserSlice'
import selectedGameReducer from './reducers/selectedGameSlice'

const allReducers = {
  currentUser: currentUserReducer,
  selectedGame: selectedGameReducer
}

const store = configureStore({ reducer: allReducers })

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch