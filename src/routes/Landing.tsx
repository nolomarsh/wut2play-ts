import { useAppSelector } from '../utils/hooks'

import { selectCurrentUser } from '../reducers/currentUserSlice'
import GamePicker from '../features/GamePicker/GamePicker'
import Login from './Login'

const Landing = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <section className='Landing'>
      {currentUser.id === -1 ?
      <>
        <Login/>
      </>
      :
      <>
        <GamePicker />
      </>
      }
    </section>
  )
}

export default Landing