import { useState } from 'react'
import { attemptLogin, selectCurrentUser } from '../reducers/currentUserSlice'
import { useAppDispatch, useAppSelector } from '../utils/hooks'

import FormInput from './FormInput'
import FormFieldset from './FormFieldset'

const LoginForm = () => {

  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(selectCurrentUser)

  const [loginData, setLoginData] = useState({username:'', password:''})

  const inputs = [
    {label: 'username', required: true},
    {label: 'password', required: true}
  ]

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({...loginData, [event.target.id]: event.target.value})
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted')
    dispatch(attemptLogin(loginData))
  }

  return (
    <form className='LoginForm' onSubmit={(event)=> handleFormSubmit(event)}>
      <FormFieldset 
        legend={'Log In'}
        changeHandler={handleFormChange}
        inputs={inputs}
        includeSubmit={true}
      />
      {currentUser.message &&
        <p>{currentUser.message}</p>
      }
    </form>
  )
}

export default LoginForm