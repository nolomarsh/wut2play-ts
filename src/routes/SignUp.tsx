import React, { useState } from 'react'
import FormInput from '../components/FormInput'

import { useAppDispatch, useAppSelector } from '../utils/hooks'

import { selectCurrentUser, signUp, setMessage } from '../reducers/currentUserSlice'

type signupProps = {toggleSignup: ()=>void}

const SignUp: React.FC<signupProps> = ({toggleSignup}) => {

  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)

  const inputs = [
    {label: 'username', required: true},
    {label: 'password', required: true},
    {label: 'confirm password', type: 'password', name: 'confirm_password', required: true},
    {label: 'email', type: 'email', required: true}
  ]

  const [signUpData, setSignUpData] = useState(
    {
      username: '',
      password: '',
      confirm_password: '',
      email: ''
    }
  )

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSignUpData({...signUpData, [e.target.name || e.target.id]: e.target.value})
  }

  const signUpSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const { username, password, confirm_password, email } = signUpData
    e.preventDefault()

    const passwordRequirements = /(?=.*?[a-zA-Z])(?=.*?[0-9]).{4,}/
    if(password !== confirm_password) {
      dispatch(setMessage(`Your passwords don't match!`))
    } else if(!passwordRequirements.test(password)) {
      dispatch(setMessage('Invalid password!'))
    } else {
      let dataToSend = {
        username: username, 
        password: password,
        email: email
      }
      dispatch(signUp(dataToSend)) 
    } 
  }

  return (
    <section className='login'>
      <h1 className='title'>Wut2Play</h1>
      <form className='login-form' onSubmit={signUpSubmitHandler}>
        <h1>Sign Up</h1>
        <div className='input-with-label'>
          <label htmlFor='username'>Username: </label>
          <input id='username' name='username' onChange={changeHandler}/>
        </div>
        <div className='input-with-label'>
          <label htmlFor='password'>Password: </label>
          <input type='password' id='password' name='password' onChange={changeHandler}/>
        </div>
        <div className='input-with-label'>
          <label htmlFor='confirm_password'>Confirm Password: </label>
          <input type='password' id='confirm_password' name='confirm_password' onChange={changeHandler}/>
        </div>
        <div className='input-with-label'>
          <label htmlFor='email'>Email: </label>
          <input id='email' name='email' onChange={changeHandler}/>
        </div>
        <input type='submit' value='Sign Up'/>
        <button onClick={toggleSignup}>Log In</button>
      </form>
      {currentUser.message &&
        <p>{currentUser.message}</p>
      }
    </section>
  )
}

export default SignUp