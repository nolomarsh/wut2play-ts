import './styles/css/App.css'

import { Outlet } from 'react-router'
import MainNav from './components/MainNav'
import { useAppDispatch, useAppSelector } from './utils/hooks'
import { selectCurrentUser, setCurrentUser } from './reducers/currentUserSlice'
import { isInitial } from './utils/functions'
import Login from './routes/Login'
import { useEffect, useState } from 'react'
import { fetchGames } from './reducers/myGamesSlice'
import SignUp from './routes/SignUp'

const App = () => {
  const currentUser = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  const [showSignup, setShowSignup] = useState(false)

  const toggleSignup = () => {
    setShowSignup(!showSignup)
  }

  useEffect(() => {
    const storedData = localStorage.getItem('currentUser') || ''
    if(storedData){
      const foundUser = JSON.parse(storedData)
      dispatch(setCurrentUser(foundUser))
      dispatch(fetchGames(foundUser.id))
    }
  },[dispatch])

  return (
    <>
      {isInitial(currentUser) ?
        <main>
          {showSignup ?
            <SignUp toggleSignup={toggleSignup}/>
            :
            <Login toggleSignup={toggleSignup}/>
          }
        </main>
        :
        <>
          <MainNav/>
          <main>
            <Outlet />
          </main>
        </>
      }
    </>
    
  )
}

export default App;
