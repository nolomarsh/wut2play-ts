import axios from 'axios'
import { useState } from 'react'
import BasicForm from '../components/BasicForm'


const GameLookup = () => {

  const [foundGames, setFoundGames] = useState([])

  const formFields = [
    {label: 'name'},
    {legend: 'Number of Players',
     inputs: [
       {label: 'min players', type: 'number'},
       {label: 'max players', type: 'number'}
      ]
    },
    {legend: 'Playtime',
      inputs: [
        {label: 'Min playtime', type: 'number'},
        {label: 'Max playtime', type: 'number'}
      ],
      includeSubmit: true
    }
  ]

  const handleFormSubmit = (searchParams: {}) => {
    console.log(searchParams)
    let searchUrl = 'https://api.boardgameatlas.com/api/search?client_id=PTozna3dDh&fuzzy_match=true&fields=name,min_players,max_players,min_playtime,max_playtime,image_url'
    for(let [key, value] of Object.entries(searchParams)){
      if (value) {
        searchUrl += `&${key.replace('-','_')}=${value}`
      }
    }
    axios.get(searchUrl).then((response) => {
      setFoundGames(response.data.games)
    })

  }

  return (
    <section className='GameLookup'>
      <BasicForm 
        onSubmit={handleFormSubmit}
        fields={formFields}
      />
    </section>
  )
}

export default GameLookup