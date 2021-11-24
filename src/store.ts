import { configureStore } from '@reduxjs/toolkit'

import currentUserReducer from './reducers/currentUserSlice'
import myGamesReducer from './reducers/myGamesSlice'

const allReducers = {
  currentUser: currentUserReducer,
  myGames: myGamesReducer
}

const store = configureStore({ reducer: allReducers })

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch