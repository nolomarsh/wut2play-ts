import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './store'

import App from './App'
import Login from './routes/Login'
import GameLookup from './routes/GameLookup'
import AddGame from './components/AddGame'
import Landing from './routes/Landing'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Landing />}/>
            <Route path='login' element ={<Login />}/>
            <Route path='profile'>
              <Route path='add-game' element={<AddGame />} />
            </Route>
            <Route path='lookup' element={<GameLookup />}>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
