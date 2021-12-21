import { createSlice, PayloadAction, createAsyncThunk } from  '@reduxjs/toolkit'
import { RootState } from '../store'
import type { loginInfo, SignUpInfo, User } from '../utils/types'
import axios from 'axios'
import { fetchGames } from './myGamesSlice'

import { apiUrl } from '../utils/variables'

export const initialUser: User = {
  id: -1,
  username: '',
  password: '',
  email: '',
  request_ids: [],
  friend_ids: [],
  message: '',
}

const initialState = initialUser

export const attemptLogin = createAsyncThunk(
  'currentUser/attemptLogin',
  async (loginInfo: loginInfo, thunkAPI) => {
    const url = apiUrl + 'users/login'
    return axios
      .post(url, loginInfo)
      .then(response => {
        console.log(response.data)
        if (response.data.id !== -1) {
          localStorage.setItem('currentUser', JSON.stringify(response.data))
          thunkAPI.dispatch(fetchGames(response.data.id))
        } else {
          localStorage.removeItem('currentUser')
        }
        return response.data
      })
  }
)

export const signUp = createAsyncThunk(
  'currentUser/signUp',
  async (signupInfo: SignUpInfo, thunkAPI) => {
    const url = apiUrl + 'users/newuser'
    return axios
      .post(url, signupInfo)
      // .catch((error) => {
      //   console.log(error)
      //   throw thunkAPI.rejectWithValue(`Server error. Please try again later.`)
      // })
      .then((response) => {
        thunkAPI.dispatch(setCurrentUser(response.data))
      })
      
  }
)

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (currentUser, action: PayloadAction<User>) => {
      return {...action.payload}
    },
    unsetCurrentUser: (currentUser) => {
      return initialState
    },
    setMessage: (currentUser, action: PayloadAction<string>) => {
      return {...currentUser, message: action.payload}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(attemptLogin.fulfilled, (currentUser, action: PayloadAction<User>) => {
        return {...action.payload, message: ''}
      })
      .addCase(attemptLogin.pending, (currentUser) => {
        return {...currentUser, message:'Please wait...'}
      })
      .addCase(signUp.rejected, (currentUser, action: PayloadAction<any>) => {
        return {...initialState, message: action.payload}
      })
  }
})

export const { setCurrentUser, unsetCurrentUser, setMessage } = currentUserSlice.actions

export const selectCurrentUser = (state: RootState) => state.currentUser

export default currentUserSlice.reducer