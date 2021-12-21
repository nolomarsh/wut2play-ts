import { useState } from 'react'
import { selectMyGames } from '../../reducers/myGamesSlice'
import { useAppSelector } from '../../utils/hooks'
import { User } from '../../utils/types'

import UserLookup from './UserLookup'
import { initialUser, selectCurrentUser } from '../../reducers/currentUserSlice'
import PickerPage from './PickerPage'

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
  const [queryStats, setQueryStats] = useState({numPlayers: 0, playtime: 0})
  const [pooledUsers, setPooledUsers] = useState([initialUser])

  const statInputs = [
    {label:`How long do you want to play?`, name:'playtime'},
    {label:`How big is your group?`, name:'numPlayers'}
  ]

  const previousStep = () => {
    setStepNumber(stepNumber - 1)
  }

  const nextStep = () => {
    setStepNumber(stepNumber + 1)
  }
  
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    if (e.target.value === '' || parseInt(e.target.value) < 0){
      setQueryStats({...queryStats, [e.target.name]: 0})
    } else {
      setQueryStats({...queryStats, [e.target.name]: parseInt(e.target.value)})
    }
  }
  
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
  
  return(
    <div>
      {stepNumber === 0 && 
        <>
          <h1>Wut2Play</h1>
        </>
      }
      {stepNumber === 1 &&
        <div>
          <label htmlFor='numPlayers'>How Big Is Your Group? </label>
          <input id='numPlayers' name='numPlayers' type='number' min='0' defaultValue={queryStats.numPlayers} onChange={inputChangeHandler}/>
        </div>
      }
      {stepNumber === 2 && 
        <UserLookup 
          pooledUsers={pooledUsers}
          togglePooledUser={togglePooledUser}
        />
      }
      {stepNumber === 3 && 
        // <FormInput inputInfo={statInputs[0]} changeHandler={inputChangeHandler}/>
        <div>
          <label htmlFor='playtime'>How Long Do You Want To Play?</label>
          <div>
            <input id='playtime' name='playtime' type='number' min='0' defaultValue={queryStats.playtime} onChange={inputChangeHandler}/>
            <span> Minutes</span>
          </div>
        </div>
      }
      {stepNumber === 4 &&
        <PickerPage 
          pooledUsers={pooledUsers}
          currentUser={currentUser}
          queryStats={queryStats}
        />
      }
      <div className='btnBox'>
        {stepNumber > 0 && 
          <button onClick={previousStep}>Back</button>
        }
        {stepNumber === 0 &&
          <button onClick={nextStep}>Get Started!</button>
        }
        {stepNumber === 1 && 
          <button onClick={nextStep}>Next</button>
        }
        {stepNumber === 2 &&
          <button onClick={nextStep}>{pooledUsers[0].id < 1 ? 'Nope!' : `That's everyone!`}</button>
        }
        {stepNumber === 3 &&
          <button onClick={nextStep}>{queryStats.playtime === 0 ? 'No Preference!' : `Let's go!`}</button>
        }
      </div>
    </div>
  )
}

export default GamePicker