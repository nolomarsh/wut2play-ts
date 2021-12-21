import { useState } from 'react'
import { initialGame, selectMyGames } from '../../reducers/myGamesSlice'
import { useAppSelector } from '../../utils/hooks'
import { User } from '../../utils/types'

import UserLookup from './UserLookup'
import { initialUser, selectCurrentUser } from '../../reducers/currentUserSlice'
import FormInput from '../../components/FormInput'
import axios from 'axios'
import { apiUrl } from '../../utils/variables'

const GamePicker = () => {

  const myGames = useAppSelector(selectMyGames)
  const currentUser = useAppSelector(selectCurrentUser)
  /*
    step 0: start
    step 1: get playtime
    step 2: get numPlayers
    step 3: add other users
    step 4: pick game 
  */
  const [stepNumber, setStepNumber] = useState(0)
  const lastStep = () => {
    setStepNumber(stepNumber - 1)
  }
  const nextStep = () => {
    setStepNumber(stepNumber + 1)
  }

  const [queryStats, setQueryStats] = useState({numPlayers: 0, playtime: 0})
  const statInputs = [
    {label:`How long do you want to play?`, name:'playtime'},
    {label:`How big is your group?`, name:'numPlayers'}
  ]
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setQueryStats({...queryStats, [e.target.id]: e.target.value})
  }

  const [pooledUsers, setPooledUsers] = useState([initialUser])
  const togglePooledUser = (inUser: User) => {
    //user is already in pool, so remove
    if(pooledUsers.some(user => user.id === inUser.id)){
      if(pooledUsers.length === 1) {
        setPooledUsers([initialUser])
      } else {
        setPooledUsers(pooledUsers.filter(user=> user.id !== inUser.id))
      }
    } else { //user is not in pool, so add
      if(pooledUsers.length === 1 && pooledUsers[0].id < 1) {
        setPooledUsers([inUser])
      } else {
        setPooledUsers(pooledUsers.concat(inUser))
      }
    }
  }

  const [pickedGame, setPickedGame] = useState(initialGame)
  const pickRandomGame = () => {
    const idsArray = pooledUsers.map(user => user.id).concat(currentUser.id)
    const url = apiUrl + 'games/get_game_pool'
    const reqBody = {
      user_ids: idsArray,
      playtime: queryStats.playtime,
      num_players: queryStats.numPlayers
    }
    axios
      .post(url, reqBody)
      .then((response) => {
        const gamePool = response.data
        const randomGame = gamePool[Math.floor(Math.random() * gamePool.length)]
        setPickedGame(randomGame)
      })
  }
  
  return(
    <div>
      {stepNumber === 0 && 
        <>
          <h1>Wut2Play</h1>
        </>
      }
      {stepNumber === 1 && 
        <FormInput inputInfo={statInputs[0]} changeHandler={inputChangeHandler}/>
      }
      {stepNumber === 2 &&
        <FormInput inputInfo={statInputs[1]} changeHandler={inputChangeHandler}/>
      }
      {stepNumber === 3 && 
        <UserLookup 
          pooledUsers={pooledUsers}
          togglePooledUser={togglePooledUser}
        />
      }
      {stepNumber === 4 &&
        <>
          <p>{pickedGame.name}</p>
          <button onClick={pickRandomGame}>Pick game</button>
        </>
      }
      <div className='btnBox'>
        {stepNumber > 0 && 
          <button onClick={lastStep}>Back</button>
        }
        {stepNumber === 3 &&
          <button onClick={nextStep}>{pooledUsers[0].id < 1 ? 'Nope!' : `That's everyone!`}</button>
        }
        {stepNumber < 3 && 
          <button onClick={nextStep}>Next</button>
        }
      </div>
    </div>
  )
}

export default GamePicker