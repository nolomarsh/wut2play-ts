import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { selectCurrentUser, setCurrentUser, unsetCurrentUser } from '../reducers/currentUserSlice'
import { fetchGames, unsetMyGames } from '../reducers/myGamesSlice'

const TopNav = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const currentUser = useAppSelector(selectCurrentUser)

  const logOut = () => {
    dispatch(unsetCurrentUser())
    dispatch(unsetMyGames())
    localStorage.removeItem('currentUser')
    navigate('/')
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
    <nav className='TopNav'>
      <Link className='navBtn logo' to='/'>Wut2Play</Link>
      {currentUser.id === -1 ?
        <>
          <Link to='/login'>Log In</Link>
          <Link to='/signup'>Sign Up</Link>
        </>
        :
        <>
          <p>Hello, <Link to='/profile' className='navBtn'>{currentUser.username}</Link></p>
          <p className='navBtn' onClick={logOut}>Log Out</p>
          <Link to='/lookup' className='navBtn'>Game Lookup</Link>
        </>
      }
    </nav>
  )
}

export default TopNav