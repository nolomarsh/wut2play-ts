import React from 'react'
import GameCard from '../components/GameCard'
import { useAppSelector } from '../utils/hooks'
import { selectMyGames } from '../reducers/myGamesSlice'
import { selectCurrentUser } from '../reducers/currentUserSlice'

const Profile = () => {
  const currentUser = useAppSelector(selectCurrentUser)
  const myGames = useAppSelector(selectMyGames)

  return (
    <section>
      <h1>My Games</h1>
      {myGames.map((game) => {
        return (
          <GameCard game={game} key={game.id}/>
        )
      })}
    </section>
  )
}

export default Profile