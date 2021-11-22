import axios from 'axios'
import { useState } from 'react'
import { StrippedBGAGame, BoardGameAtlasGameData } from '../utils/types'

import BasicForm from '../components/BasicForm'
import GameCard from '../components/GameCard'

const initialFoundGamesState: StrippedBGAGame[] = [{
  name: '',
  image_url: '',
  min_players: 0,
  max_players: 0,
  min_playtime: 0,
  max_playtime: 0,
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
        {label: 'min', name: 'min_players', type: 'number'},
        {label: 'max', name: 'max_players', type: 'number'}
        ] 
    },
    {
      legend: 'Playtime',
      inputs: [
        {label: 'min', name: 'min_playtime', type: 'number'},
        {label: 'max', name: 'max_playtime', type: 'number'}
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
          name: game.name,
          image_url: game.image_url,
          min_players: game.min_players,
          max_players: game.max_players,
          min_playtime: game.min_playtime,
          max_playtime: game.max_playtime,
          type: game.type
        }
      })
      setFoundGames(strippedGames.filter((game: StrippedBGAGame) => {
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
      {(foundGames.length > 1 || foundGames[0].name !== '') && foundGames.map((game, index) => {
       return <GameCard game={game} key={index}/>
      })}
    </section>
  )
}

export default GameLookup