import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../utils/hooks'

import { selectMyGames } from '../reducers/myGamesSlice'
import { selectCurrentUser } from '../reducers/currentUserSlice'

import { StrippedBGAGame } from '../utils/types'

import AddGame from './AddGame'

type GameCardProps = {game: StrippedBGAGame}

const GameCard: React.FC<GameCardProps> = (props: GameCardProps) => {
  const { game } = props
  const { 
    name, 
    image_url, 
    min_players, 
    max_players,
    min_playtime,
    max_playtime
  } = game;

  const myGames = useAppSelector(selectMyGames)
  const currentUser = useAppSelector(selectCurrentUser)

  const [showAddForm, setShowAddForm] = useState(false)

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  const checkAddable = () => {
    if (currentUser.id !== -1 && !myGames.some(myGame => myGame.name === name)) {
      return true
    }
    return false
  }

  return (
    <div className='GameCard'>
      <img className='card-img' src={image_url} alt={name}/>
      <div className='card-content'>
        <p>{name}</p>
        <p>Players: {min_players}-{max_players}</p>
        <p>Playtime: {min_playtime}-{max_playtime} minutes</p>
        {checkAddable() &&
          <button onClick={toggleAddForm}>Add Game</button>
        }
      </div>
      {showAddForm && 
        <AddGame game={game}/>
      }
    </div>
  )
}

export default GameCard