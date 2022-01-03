import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../utils/hooks'
import { unsetCurrentUser } from '../reducers/currentUserSlice'
import { unsetMyGames } from '../reducers/myGamesSlice'

const TopNav = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logOut = () => {
    dispatch(unsetCurrentUser())
    dispatch(unsetMyGames())
    localStorage.removeItem('currentUser')
    navigate('/')
  }

  return (
    <nav id='main-nav'>
      <Link className='navBtn logo' to='/'>Wut2Play</Link>
      <Link to='/profile' className='navBtn'>My Games</Link>
      <Link to='/lookup' className='navBtn'>Game Lookup</Link>
      <p className='navBtn' onClick={logOut}>Log Out</p>
    </nav>
  )
}

export default TopNav