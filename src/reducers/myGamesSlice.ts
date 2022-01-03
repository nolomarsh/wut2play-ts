import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { GameEntry } from '../utils/types'
import { apiUrl } from '../utils/url'
import axios from 'axios'

export const initialGame: GameEntry = {
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

const initialState = [initialGame]

export const addGame = createAsyncThunk(
  'myGames/addGame',
  async (gameEntry: GameEntry, thunkAPI) => {
    const url = apiUrl + 'games/newgame'
    return axios
      .post(url, gameEntry)
      .then(response => {
        return response.data
      })
  }
)

export const fetchGames = createAsyncThunk(
  'myGames/fetchGames',
  async (userId: number, thunkAPI) => {
    const url = apiUrl + `games/${userId}`
    return axios
      .get(url)
      .then(response => {
        // console.log('fetch data: ', response.data)
        const foundGames = response.data
        for (let game of foundGames) {
          if (game.notes === 'undefined'){
            game.notes = ''
          }
        }
        return foundGames
      })
  }
)

export const removeGame = createAsyncThunk(
  'myGames/removeGame',
  async (info:{gameId: number, userId: number}, thunkAPI) => {
    const url = apiUrl + `games/${info.gameId}`
    return axios
      .delete(url, {data: {user_id: info.userId}})
      .then(response => {
        return response.data
      })
  }
)

const myGamesSlice = createSlice({
  name: 'myGames',
  initialState,
  reducers: {
    setMyGames: (myGames, action: PayloadAction<GameEntry[]>) => {
      return [...action.payload]
    },
    unsetMyGames: (myGames) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGame.fulfilled, (myGames, action: PayloadAction<GameEntry[]>) => {
        return [...action.payload]
      })
      .addCase(fetchGames.fulfilled, (myGames, action: PayloadAction<GameEntry[]>) => {
        return [...action.payload]
      })
      .addCase(removeGame.fulfilled, (myGames, action: PayloadAction<GameEntry[]>) => {
        return [...action.payload] 
        // console.log(action.payload)
      })
  }
})

export const { setMyGames, unsetMyGames } = myGamesSlice.actions

export const selectMyGames = (state: RootState) => state.myGames

export default myGamesSlice.reducer