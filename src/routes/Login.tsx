import React, { useState } from 'react'
import BasicForm from '../components/BasicForm'
import { attemptLogin, selectCurrentUser } from '../reducers/currentUserSlice'
import { useAppDispatch, useAppSelector } from '../utils/hooks'

type loginProps = {toggleSignup: ()=>void}

const Login: React.FC<loginProps> = ({toggleSignup}) => {
  const currentUser = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()

  const [loginInfo, setLoginInfo] = useState({username: '', password: ''})

  const formFieldsets = [
    {
      legend: 'Log In',
      inputs: [
        {label: 'username', required: true, defaultValue: ''},
        {label: 'password', required: true, defaultValue: ''}
      ],
      includeSubmit: true
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({...loginInfo, [e.target.name]:e.target.value})
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(attemptLogin(loginInfo))
  }

  return (
    <section className='login'>
      <h1 className='title'>Wut2Play</h1>
      <form className='login-form' onSubmit={handleLogin}>
        <h1>Log In</h1>
        <div className='input-with-label'>
          <label htmlFor='username'>Username: </label>
          <input id='username' name='username' onChange={handleChange}/>
        </div>
        <div className='input-with-label'>
          <label htmlFor='password'>Password: </label>
          <input type='password' id='password' name='password' onChange={handleChange}/>
        </div>
        <input className='form-button' type='submit' value='Log In'/>
        <button className='form-button' onClick={toggleSignup}>Sign Up</button>
      </form>
      {currentUser.message &&
        <p>{currentUser.message}</p>
      }
    </section>
  )
}

export default Login