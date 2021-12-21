import { useState } from 'react'
import axios from 'axios'
import { initialGame } from '../../reducers/myGamesSlice'
import { GameEntry, User } from '../../utils/types'
import { apiUrl } from '../../utils/url'

type PickerProps = {
  pooledUsers: User[]
  currentUser: User
  queryStats: {playtime: number, numPlayers: number}
}

const PickerPage = ({pooledUsers, currentUser, queryStats}: PickerProps) => {

  const [gamePool, setGamePool] = useState([initialGame])
  const [pickedGame, setPickedGame] = useState(initialGame)
  const [showNoneFound, setShowNoneFound] = useState(false)

  const getGamePool = () => {
    const idsArray = pooledUsers.map(user => user.id).concat(currentUser.id)
    const url = apiUrl + 'games/get_game_pool'
    const reqBody = {
      user_ids: idsArray,
      playtime: queryStats.playtime,
      num_players: queryStats.numPlayers
    }
    axios.post(url, reqBody).then((response) => {
      if(response.data.length > 0){
        setShowNoneFound(false)
        setGamePool(response.data)
        pickRandomGame(response.data)
      } else {
        setShowNoneFound(true)
        setGamePool([initialGame])
      }
    })
  }

  const pickRandomGame = (inPool?: GameEntry[]) => {
    const usePool = inPool || gamePool
    const randomGame = usePool[Math.floor(Math.random() * usePool.length)]
    setPickedGame(randomGame)
  }

  return (
    <>
      <p>{pickedGame.name}</p>
      {showNoneFound && 
        <p>You don't have any games that meet those requirements! Sorry!</p>
      }
      <button onClick={gamePool[0].id < 1 ? getGamePool : ()=>pickRandomGame(gamePool)}>Pick game</button>
    </>
  )
}

export default PickerPage