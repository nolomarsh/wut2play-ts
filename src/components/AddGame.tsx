import { useAppSelector } from '../utils/hooks'

import { selectCurrentUser } from '../reducers/currentUserSlice'
import { addGame } from '../reducers/myGamesSlice'

import { StrippedBGAGame, GameEntry } from '../utils/types'

import BasicForm from './BasicForm'

type AddGameProps = {
  game?: StrippedBGAGame
}

const AddGame: React.FC<AddGameProps> = (props: AddGameProps) => {

  let name, image_url, min_players, max_players, min_playtime, max_playtime, type
  
  if (props.game) {
    ({ name, image_url, min_players, max_players, min_playtime, max_playtime, type } = props.game)
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
    <section className='AddGame'>
      <BasicForm 
        onSubmit={addGame}
        fields={formFields}
        doesDispatch={true}
      />
    </section>
  )
}

export default AddGame