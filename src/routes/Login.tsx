import { useState } from 'react'
import { attemptLogin, selectCurrentUser } from '../reducers/currentUserSlice'
import { useAppDispatch, useAppSelector } from '../utils/hooks'

import FormInput from '../components/FormInput'

const Login = () => {

  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(selectCurrentUser)

  const [loginData, setLoginData] = useState({username:'', password:''})

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({...loginData, [event.target.id]: event.target.value})
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted')
    dispatch(attemptLogin(loginData))
  }

  return (
    <section className='Login'>
      <form onSubmit={(event)=> handleFormSubmit(event)}>
        <fieldset>
          <legend>Log In</legend>
          <FormInput label="username" changeHandler={handleFormChange}/>
          <FormInput label='password' changeHandler={handleFormChange}/>
          <input type='submit' value='Log In'/>
        </fieldset>
        {currentUser.message &&
          <p>{currentUser.message}</p>
        }
      </form>
    </section>
  )
}

export default Login