import { useRef, useState } from 'react'
import { attemptLogin, setCurrentUser } from '../reducers/currentUserSlice'
import { useAppDispatch } from '../utils/hooks'

const Login = () => {

  const dispatch = useAppDispatch()

  const [loginData, setLoginData] = useState({username:'', password:''})

  const usernameInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({...loginData, [event.target.id]: event.target.value})
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted')
    // const loginInfo: loginInfo = {
    //   username: usernameInput.current?.value,
    //   password: passwordInput.current?.value
    // }
    dispatch(attemptLogin(loginData))
  }

  const dummyLogin = () => {
    dispatch(setCurrentUser({
      "id": 2,
      "username": "test",
      "password": "$2b$10$wqcgvwFj0b7NVm3yvuaqte44tnQ6G/cFAu5egWsAGTlvlpXnKwWMe",
      "email": "test@email.com"
  }))
  }

  return (
    <section className='Login'>
      <form onSubmit={(event)=> handleFormSubmit(event)}>
        <fieldset>
          <legend>Log In</legend>
          <label htmlFor='username'>Username: </label>
          <input type='text' ref={usernameInput} id='username' onChange={handleFormChange}/>
          <label htmlFor='password'>Password: </label>
          <input type='password' ref={passwordInput} id='password' onChange={handleFormChange}/>
          <input type='submit' value='Log In'/>
        </fieldset>
      </form>
      <button onClick={dummyLogin}>Dummy Login</button>
    </section>
  )
}

export default Login