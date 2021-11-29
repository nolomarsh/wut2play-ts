import React, { useState } from 'react'
import FormInput from '../components/FormInput'

import { useAppDispatch, useAppSelector } from '../utils/hooks'

import { selectCurrentUser, signUp, setMessage } from '../reducers/currentUserSlice'

const SignUp = () => {

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
  const [signUpError, setSignUpError] = useState('')

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
    <section className='SignUp' onSubmit={signUpSubmitHandler}>
      <form>
        {inputs.map((input, index) => {
          return <FormInput changeHandler={changeHandler} inputInfo={input} key={index}/>
        })}
        <input type='submit' value='Sign Up'/>
      </form>
      <p>{currentUser.message}</p>
    </section>
  )
}

export default SignUp