import { GameData } from '../utils/types'

type GameCardProps = {game: GameData}

const GameCard: React.FC<GameCardProps> = (props: GameCardProps) => {
  const { 
    id, 
    name, 
    image_url, 
    min_players, 
    max_players,
    min_playtime,
    max_playtime, 
    notes, 
    user_id } = props.game
  
  return (
    <div className='GameCard'>
      <img src={image_url} alt={name}/>
      <p>{name}</p>
      <p>Players: {min_players}-{max_players}</p>
      <p>Playtime: {min_playtime}-{max_playtime} minutes</p>
    </div>
  )
}

export default GameCard