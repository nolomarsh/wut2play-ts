import axios from 'axios'
import React, { useState } from 'react'
import { BoardGameAtlasGameData, GameEntry } from '../utils/types'

import BasicForm from '../components/BasicForm'
import GameCard from '../components/GameCard'

const initialFoundGamesState: GameEntry[] = [{
  id: -1,
  name: '',
  image_url: '',
  min_players: 0,
  max_players: 0,
  min_playtime: 0,
  max_playtime: 0,
  type: '',
  user_id: -1
}]

const GameLookup = () => {

  const [searchParams, setSearchParams] = useState({name:''})
  const [foundGames, setFoundGames] = useState(initialFoundGamesState)
  const [showNoneFound, setShowNoneFound] = useState(false)
  const [noAccessories] = useState(true)
  const [noExpansions] = useState(true)

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({...searchParams, [e.target.name]: e.target.value})
  }

  const handleSearchSubmit = () => {
    let searchUrl = `https://api.boardgameatlas.com/api/search?client_id=PTozna3dDh&fuzzy_match=true&limit=50`
    for(let [key, value] of Object.entries(searchParams)){
      if (value) {
        searchUrl += `&${key.replace('-','_')}=${value}`
      }
    }
    axios.get(searchUrl).then((response) => {
      const { games } = response.data
      const strippedGames = games.map((game: BoardGameAtlasGameData) => {
        return {
          id: game.id,
          name: game.name,
          image_url: game.image_url,
          min_players: game.min_players,
          max_players: game.max_players,
          min_playtime: game.min_playtime,
          max_playtime: game.max_playtime,
          type: game.type,
          user_id: -1
        }
      })
      const filteredGames = strippedGames.filter((game: GameEntry) => {
        if (
          (noAccessories && game.type === 'accessory') ||
          (noExpansions && game.type === 'expansion')
        ) {
          return false
        } else {
          return true
        }
      })
      if (filteredGames.length > 0) {
        setFoundGames(filteredGames)
        setShowNoneFound(false)
      } else {
        setFoundGames(initialFoundGamesState)
        setShowNoneFound(true)
      }
    })
  }

  return (
    <section className='game-lookup'>
      <h1>Find a Game!</h1>
      <div className='input-with-label'>
        <label htmlFor='name'>Name: </label>
        <input id='name' name='name' onChange={inputChangeHandler}/>
        <button onClick={handleSearchSubmit}>Search</button>
      </div>
      {showNoneFound && 
        <h2>No matching games were found! Sorry!</h2>
      }
      <div className='card-box'>
        {(foundGames.length > 1 || foundGames[0].name !== '') && foundGames.map((game) => {
        return <GameCard game={game} key={game.id}/>
        })}
      </div>      
    </section>
  )
}

export default GameLookup