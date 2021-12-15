import { useAppSelector } from '../utils/hooks'

import { selectCurrentUser } from '../reducers/currentUserSlice'
import { addGame } from '../reducers/myGamesSlice'

import { GameEntry } from '../utils/types'

import BasicForm from './BasicForm'

type AddGameProps = {
  game?: GameEntry
}

/**
 * Renders a form to add a game to the database. 
 * Requires a user_id to submit correctly, so the form will not render if there isn't a currentUser logged in
 */
const AddGame: React.FC<AddGameProps> = (props: AddGameProps) => {

  let name, image_url, min_players, max_players, min_playtime, max_playtime
  
  if (props.game) {
    ({ name, image_url, min_players, max_players, min_playtime, max_playtime } = props.game)
  }

  const currentUser = useAppSelector(selectCurrentUser)

  const formFields = [
    {label: 'name', required: true, defaultValue: name},
    {label: 'image url', name: 'image_url', defaultValue: (image_url || '')},
    {legend: 'Number of Players', inputs: [
      {label: 'Min', type: 'number', name: 'min_players', required: true, defaultValue: (min_players || 0)},
      {label: 'max', type: 'number', name: 'max_players', required: true, defaultValue: (max_players || 0)}
    ]},
    {legend: 'Playtime', inputs: [
      {label: 'Min', type: 'number', name: 'min_playtime', required: true, defaultValue: (min_playtime || 0)},
      {label: 'max', type: 'number', name: 'max_playtime', required: true, defaultValue: (max_playtime || 0)}
    ]},
    {label: 'notes', type: 'textarea', defaultValue: ''},
    {label: 'user_id', type: 'hidden', defaultValue: currentUser.id}
  ]

  return (
    <div className='AddGame'>
      {currentUser.id > 0 && 
        <BasicForm 
          onSubmit={addGame}
          fields={formFields}
          doesDispatch={true}
        />
      }
    </div>
  )
}

export default AddGame