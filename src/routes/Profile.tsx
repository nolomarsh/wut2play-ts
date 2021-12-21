import React from 'react'
import GameCard from '../components/GameCard'
import { useAppSelector } from '../utils/hooks'
import { selectMyGames } from '../reducers/myGamesSlice'
import { selectCurrentUser } from '../reducers/currentUserSlice'

const Profile = () => {
  const myGames = useAppSelector(selectMyGames)
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <section>
      <h1>Hello {currentUser.username}</h1>
      <h2>My Games</h2>
      {myGames.map((game) => {
        return (
          <GameCard game={game} key={game.id}/>
        )
      })}
    </section>
  )
}

export default Profile