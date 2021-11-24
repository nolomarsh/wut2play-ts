import { useState } from 'react'
import { selectMyGames } from '../reducers/myGamesSlice'
import { useAppSelector } from '../utils/hooks'

import { GameEntry } from '../utils/types'

const GamePicker = () => {

  const initialState: GameEntry = {
    id: 0,
    name: '',
    image_url: '',
    min_players: 0,
    max_players: 0,
    min_playtime: 0,
    max_playtime: 0,
    notes: '',
    user_id: 0
  }

  const [pickedGame, setPickedGame] = useState(initialState)

  const myGames = useAppSelector(selectMyGames)

  const pickRandomGame = () => {
    const randomGame = myGames[Math.floor(Math.random() * myGames.length)]
    setPickedGame(randomGame)
  }
  
  return(
    <div>
      <p>{pickedGame.name}</p>
      <button onClick={pickRandomGame}>Pick game</button>
    </div>
  )
}

export default GamePicker