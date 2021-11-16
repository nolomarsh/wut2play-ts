import DispatchForm from '../components/DispatchForm'
import { attemptLogin, selectCurrentUser } from '../reducers/currentUserSlice'
import { useAppSelector } from '../utils/hooks'

const Login = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  const formFieldsets = [
    {
      legend: 'Log In',
      inputs: [
        {label: 'username', required: true},
        {label: 'password', required: true}
      ],
      includeSubmit: true
    },
  ]

  return (
    <section className='Login'>
      <DispatchForm 
        submitActionCreator={attemptLogin}
        fieldsets={formFieldsets}
      />
      {currentUser.message &&
        <p>{currentUser.message}</p>
      }
    </section>
  )
}

export default Login