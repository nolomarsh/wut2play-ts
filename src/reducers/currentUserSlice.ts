import { createSlice, PayloadAction, createAsyncThunk } from  '@reduxjs/toolkit'
import { RootState } from '../store'
import type { loginInfo } from '../utils/types'
import axios from 'axios'

interface CurrentUserState {
  id: number
  username: string
  password: string
  email: string
  message?: string
}

const initialState: CurrentUserState = {
  id: -1,
  username: '',
  password: '',
  email: '',
  message: '',
} 
// as CurrentUserState

export const attemptLogin = createAsyncThunk(
  'currentUser/attemptLogin',
  async (loginInfo: loginInfo, thunkAPI) => {
    const url = 'https://wut2play-api.herokuapp.com/users/login'
    return axios
      .post(url, loginInfo)
      .then(response => {
        console.log(response.data)
        if (response.data.id !== -1) {
          localStorage.setItem('currentUser', JSON.stringify(response.data))
        } else {
          localStorage.removeItem('currentUser')
        }
        return response.data
      })
  }
)

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (currentUser, action: PayloadAction<CurrentUserState>) => {
      return {...action.payload}
    },
    unsetCurrentUser: (currentUser) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(attemptLogin.fulfilled, (currentUser, action: PayloadAction<CurrentUserState>) => {
        return {...action.payload, message: ''}
      })
      .addCase(attemptLogin.pending, (currentUser) => {
        return {...currentUser, message:'Please wait...'}
      })
  }
})

export const { setCurrentUser, unsetCurrentUser } = currentUserSlice.actions

export const selectCurrentUser = (state: RootState) => state.currentUser

export default currentUserSlice.reducer