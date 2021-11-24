import BasicForm from '../components/BasicForm'
import { attemptLogin, selectCurrentUser } from '../reducers/currentUserSlice'
import { useAppSelector } from '../utils/hooks'

const Login = () => {
  const currentUser = useAppSelector(selectCurrentUser)

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

  return (
    <section className='Login'>
      <BasicForm 
        onSubmit={attemptLogin}
        fields={formFieldsets}
        doesDispatch={true}
      />
      {currentUser.message &&
        <p>{currentUser.message}</p>
      }
    </section>
  )
}

export default Login