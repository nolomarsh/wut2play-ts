import { selectSelectedGame } from '../reducers/selectedGameSlice'
import { useAppSelector } from '../utils/hooks'

const AddGame = () => {

  const selectedGame = useAppSelector(selectSelectedGame)

  return (
    <section className='AddGame'>
      
    </section>
  )
}

export default AddGame