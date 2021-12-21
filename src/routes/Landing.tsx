import { useAppSelector } from '../utils/hooks'

import { selectCurrentUser } from '../reducers/currentUserSlice'
import { selectMyGames } from '../reducers/myGamesSlice'
import GamePicker from '../features/GamePicker/GamePicker'

const Landing = () => {
  const currentUser = useAppSelector(selectCurrentUser)
  const myGames = useAppSelector(selectMyGames)

  return (
    <section className='Landing'>
      {currentUser.id === -1 ?
      <>
        <h1>Please log in</h1>
      </>
      :
      <>
        <h1>Hello {currentUser.username}</h1>
        <GamePicker />
      </>
      }
    </section>
  )
}

export default Landing