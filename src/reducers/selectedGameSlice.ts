import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { GameData } from '../utils/types'

const initialState: GameData = {
  id: -1,
  name: '',
  image_url: '',
  min_players: -1,
  max_players: -1,
  min_playtime: -1,
  max_playtime: -1,
  notes: '',
  user_id: -1
}

const selectedGameSlice = createSlice({
  name: 'selectedGame',
  initialState,
  reducers: {
    setSelectedGame: (selectedGame, action: PayloadAction<GameData>) => {
      return {...action.payload}
    },
    unsetSelectedGame: (selectedGame) => {
      return initialState
    }
  }
})

export const { setSelectedGame, unsetSelectedGame } = selectedGameSlice.actions

export const selectSelectedGame = (state: RootState) => state.selectedGame

export default selectedGameSlice.reducer