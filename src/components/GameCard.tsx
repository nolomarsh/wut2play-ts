import { useState } from 'react'
// import { useNavigate } from 'react-router'
import { useAppSelector, useAppDispatch } from '../utils/hooks'

import { selectMyGames, removeGame } from '../reducers/myGamesSlice'
import { selectCurrentUser } from '../reducers/currentUserSlice'

import { GameEntry } from '../utils/types'

import AddGame from './AddGame'
import GameForm from './GameForm'

type GameCardProps = {game: GameEntry}

const GameCard: React.FC<GameCardProps> = ({game}: GameCardProps) => {
  const { 
    id,
    name, 
    image_url, 
    min_players, 
    max_players,
    min_playtime,
    max_playtime,
    user_id
  } = game;

  const myGames = useAppSelector(selectMyGames)
  const currentUser = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()

  const [showForm, setShowForm] = useState(false)

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  /**
   * Verifies that there is a user logged in and that they do not have a game with the same name already
   * @returns a boolean  
   */
  const checkAddable = () => {
    if (currentUser.id !== -1 || !myGames.some(myGame => myGame.name === name)) {
      return true
    }
    return false
  }

  const canAddOrEdit = () => {
    if (myGames.some(myGame => myGame.name === name) && game.user_id !== currentUser.id) {
      return false
    } else {
      return true
    }
  }

  return (
    <div className='game-card'>
      <img className='card-img' src={image_url} alt={name}/>
      <div className='card-content'>
        {!showForm && 
          <>
            <p>{name}</p>
            <p>Players: {min_players}-{max_players}</p>
            <p>Playtime: {min_playtime}-{max_playtime} minutes</p>
            <button onClick={toggleForm} disabled={!canAddOrEdit()}>{game.user_id !== currentUser.id ? 'Add Game' : 'Edit Game'}</button>
          </>
        }
        {showForm && 
          // <AddGame game={game} toggler={toggleAddForm} />
          <GameForm 
            game={game} 
            toggler={toggleForm} 
            currentUser={currentUser}
          />
        }
      </div>
    </div>
  )
}

export default GameCard