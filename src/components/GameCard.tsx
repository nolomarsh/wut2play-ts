import { useNavigate } from 'react-router'
import { setSelectedGame } from '../reducers/selectedGameSlice'
import { useAppDispatch } from '../utils/hooks'
import { StrippedBGAGame } from '../utils/types'

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

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const handleClick = () => {
    // dispatch(setSelectedGame(game))
    navigate('/profile/add-game')
  }

  return (
    <div className='GameCard'>
      <img className='card-img' src={image_url} alt={name}/>
      <div className='card-content'>
        <p>{name}</p>
        <p>Players: {min_players}-{max_players}</p>
        <p>Playtime: {min_playtime}-{max_playtime} minutes</p>
        <button onClick={handleClick}>Add Game</button>
      </div>
    </div>
  )
}

export default GameCard