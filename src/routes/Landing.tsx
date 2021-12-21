import { useAppSelector } from '../utils/hooks'

import { selectCurrentUser } from '../reducers/currentUserSlice'
import GamePicker from '../features/GamePicker/GamePicker'

const Landing = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <section className='Landing'>
      {currentUser.id === -1 ?
      <>
        <h1>Please log in</h1>
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