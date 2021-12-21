import axios from 'axios'
import { useState } from 'react'
import { initialUser, selectCurrentUser } from '../../reducers/currentUserSlice'
import { useAppSelector } from '../../utils/hooks'
import { User } from '../../utils/types'
import { apiUrl } from '../../utils/url'

type UserLookupProps = {
  pooledUsers: User[]
  togglePooledUser: (inUser: User) => void

}

const UserLookup = ({ pooledUsers, togglePooledUser }: UserLookupProps) => {
  const currentUser = useAppSelector(selectCurrentUser)

  const [foundUsers, setFoundUsers] = useState([initialUser])
  const [queryString, setQueryString] = useState('')

  const filterFoundUsers = (inUser:User) => {
    for (let pooledUser of pooledUsers) {
      if(inUser.id === pooledUser.id || inUser.id === currentUser.id) {
        return false
      }
    }
    return true
  }

  const lookupUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryString(e.target.value)
    if(e.target.value.length > 0) {
      const url = apiUrl + 'users/getmanybyname'
      axios
        .post(url, {username: e.target.value})
        .then((response) => {
          const filteredUsers = response.data.filter(filterFoundUsers)
          console.log(filteredUsers)
          if(filteredUsers.length > 0) {
            setFoundUsers(filteredUsers)
          } else {
            setFoundUsers([initialUser])
          }
      })
    } else {
      setFoundUsers([initialUser])
    }
  }

  const handleClickClearSearch = (inUser:User) => {
    togglePooledUser(inUser)
    setFoundUsers([initialUser])
    setQueryString('')
  }

  return (
    <div className='lookup'>
        <h1>Anyone we know?</h1>
        <ul>
          {pooledUsers[0].id > 0 && pooledUsers.map((user) => {
            return (
              <li key={user.id}>
                {user.username}
                <button onClick={()=>togglePooledUser(user)}>X</button>
              </li>
            )
          })}
        </ul>
        <label htmlFor='username'>Username: </label>
        <input id='username' value={queryString} onChange={lookupUsers}/>
        
        <ul>
          {foundUsers[0].id > 0 && foundUsers.filter(filterFoundUsers).map((user) => {
            return (
              <li key={user.id}>
                {user.username} 
                <button onClick={()=>handleClickClearSearch(user)}>Add</button>
              </li>
            )
          })}
        </ul>
      </div>
  )
}

export default UserLookup