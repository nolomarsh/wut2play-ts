import axios from 'axios'
import { useState } from 'react'
import { GameData, BoardGameAtlasGameData } from '../utils/types'

import BasicForm from '../components/BasicForm'
import GameCard from '../components/GameCard'

type typedGame = GameData & {type:string}

const initialFoundGamesState: typedGame[] = [{
  id: -1,
  name: '',
  min_players: -1,
  max_players: -1,
  min_playtime: -1,
  max_playtime: -1,
  user_id: -1,
  type: ''
}]

const GameLookup = () => {

  const [foundGames, setFoundGames] = useState(initialFoundGamesState)
  const [noAccessories, setNoAccessories] = useState(true)
  const [noExpansions, setNoExpansions] = useState(true)

  const formFields = [
    {label: 'name'},
    {
      legend: 'Number of Players',
      inputs: [
        {label: 'min players', type: 'number'},
        {label: 'max players', type: 'number'}
        ] 
    },
    {
      legend: 'Playtime',
      inputs: [
        {label: 'Min playtime', type: 'number'},
        {label: 'Max playtime', type: 'number'}
      ],
      includeSubmit: true
    }
  ] 

  const handleSearchSubmit = (searchParams: {}) => {
    let searchUrl = `https://api.boardgameatlas.com/api/search?client_id=PTozna3dDh&fuzzy_match=true&limit=50`
    for(let [key, value] of Object.entries(searchParams)){
      if (value) {
        searchUrl += `&${key.replace('-','_')}=${value}`
      }
    }
    axios.get(searchUrl).then((response) => {
      const strippedGames = response.data.games.map((game: BoardGameAtlasGameData) => {
        return {
          id: -1,
          name: game.name,
          image_url: game.image_url,
          min_players: game.min_players,
          max_players: game.max_players,
          min_playtime: game.min_playtime,
          max_playtime: game.max_playtime,
          user_id: -1,
          type: game.type
        }
      })
      setFoundGames(strippedGames.filter((game: typedGame) => {
        if (
          (noAccessories && game.type === 'accessory') ||
          (noExpansions && game.type === 'expansions')
        ) {
          return false
        } else {
          return true
        }
      }))
    })

  }

  return (
    <section className='GameLookup'>
      <BasicForm 
        onSubmit={handleSearchSubmit}
        fields={formFields}
      />
      {foundGames !== initialFoundGamesState && foundGames.map((game, index) => {
       return <GameCard game={game} key={index}/>
      })}
    </section>
  )
}

export default GameLookup