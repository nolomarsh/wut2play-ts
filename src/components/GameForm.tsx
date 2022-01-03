import React, { useState } from 'react'
import { addGame, initialGame, removeGame } from '../reducers/myGamesSlice'
import { useAppDispatch } from '../utils/hooks'
import { GameEntry, User } from '../utils/types'



type GameFormProps = {
  game?: GameEntry,
  toggler?: () => void,
  currentUser: User
}

const GameForm = ({game, toggler, currentUser}: GameFormProps) => {
  const checkForGame = () => {
    if(game){
      return game
    } else {
      return initialGame
    }
  }

  let { id, name, image_url, min_players, max_players, min_playtime, max_playtime, notes } = checkForGame()

  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState(checkForGame())

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.id]:e.target.value})
  }

  const removeHandler = () => {
    if(id){
      let axiosInfo = {
        gameId: id,
        userId: currentUser.id
      }
      dispatch(removeGame(axiosInfo))
    }
  }

  const addHandler = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(addGame({...formData, user_id: currentUser.id}))
    if (toggler) {
      toggler()
    }
  }

  return (
    <form className='game-form' onSubmit={game && game.user_id !== currentUser.id ? addHandler : undefined}>
      <div className='input-with-label'>
        <label htmlFor='name'>Name: </label>
        <input defaultValue={name || ''} id='name' onChange={changeHandler}/>
      </div>
      <div className='input-with-label'>
        <label htmlFor='image_url'>Image Url: </label>
        <input defaultValue={image_url || ''} id='image_url' onChange={changeHandler}/>
      </div>
      <fieldset>
        <legend>Number of Players:</legend>
        <div className='range-inputs'>
          <input className='small-input' type='number' min='1' id='min_players' defaultValue={min_players || 1} onChange={changeHandler}/>
          <span> - </span>
          <input className='small-input' type='number' min='1' id='max_players' defaultValue={max_players || 1} onChange={changeHandler}/>
        </div>
      </fieldset>
      <fieldset>
        <legend>Playtime:</legend>
        <div className='range-inputs'>
          <input className='small-input' type='number' min='15' id='min_playtime' defaultValue={min_playtime || 1} onChange={changeHandler}/>
          <span> - </span>
          <input className='small-input' type='number' min='15' id='max_playtime' defaultValue={max_playtime || 1} onChange={changeHandler}/>
        </div>
      </fieldset>
      {/* <label htmlFor='notes'>Notes:</label>
      <textarea defaultValue={notes || ''} onChange={changeHandler} id='notes'></textarea> */}
      <div className='btn-box'>
        <button onClick={toggler}>Cancel</button>
        <input type='submit' value='Submit'/>
        {game && game.user_id === currentUser.id &&
          <button onClick={removeHandler}>Remove Game</button>
        }
      </div>

    </form>
  )
}

export default GameForm