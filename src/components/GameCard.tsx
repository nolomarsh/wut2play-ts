import { useState } from 'react'
// import { useNavigate } from 'react-router'
import { useAppSelector, useAppDispatch } from '../utils/hooks'

import { selectMyGames, removeGame } from '../reducers/myGamesSlice'
import { selectCurrentUser } from '../reducers/currentUserSlice'

import { GameEntry } from '../utils/types'

import AddGame from './AddGame'

type GameCardProps = {game: GameEntry}

const GameCard: React.FC<GameCardProps> = (props: GameCardProps) => {
  const { game } = props
  const { 
    id,
    name, 
    image_url, 
    min_players, 
    max_players,
    min_playtime,
    max_playtime
  } = game;

  const myGames = useAppSelector(selectMyGames)
  const currentUser = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()

  const [showAddForm, setShowAddForm] = useState(false)

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  /**
   * Verifies that there is a user logged in and that they do not have a game with the same name already
   * @returns a boolean  
   */
  const checkAddable = () => {
    if (currentUser.id !== -1 && !myGames.some(myGame => myGame.name === name)) {
      return true
    }
    return false
  }

  const removeHandler = () => {
    let axiosInfo = {
      gameId: id,
      userId: currentUser.id
    }
    // console.log(axiosInfo)
    dispatch(removeGame(axiosInfo))
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
        {myGames.some(myGame => myGame.name === name) &&
        typeof id !== 'string' &&
          <button onClick={removeHandler}>Remove Game</button>
        }
      </div>
      {showAddForm && 
        <AddGame game={game} toggler={toggleAddForm} />
      }
    </div>
  )
}

export default GameCard