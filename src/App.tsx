import React from 'react'
import logo from './logo.svg'
import './styles/App.css'

import { useAppSelector, useAppDispatch } from './utils/hooks'
import { selectCurrentUser, setCurrentUser } from './reducers/currentUserSlice'
import { Outlet } from 'react-router'
import TopNav from './components/TopNav'

const App = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <>
      <TopNav/>
      <main className="App">
        <p>Boobies</p>
        <p>{currentUser.id}</p>
        <Outlet/>
      </main>
    </>
    
  )
}

export default App;
