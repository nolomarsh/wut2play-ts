import './styles/css/App.css'

import { Outlet } from 'react-router'
import MainNav from './components/MainNav'
import { useAppDispatch, useAppSelector } from './utils/hooks'
import { selectCurrentUser, setCurrentUser } from './reducers/currentUserSlice'
import { isInitial } from './utils/functions'
import Login from './routes/Login'
import { useEffect } from 'react'
import { fetchGames } from './reducers/myGamesSlice'

const App = () => {
  const currentUser = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()

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
          <Login />
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
