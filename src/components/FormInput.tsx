import { InputProps } from '../utils/types'
import { capitalize } from '../utils/functions'

const FormInput: React.FC<InputProps> = (props: InputProps) => {
  let { type, classes, label, changeHandler, required } = props
  
  if (label.toLowerCase() === 'password') {
    type = 'password'
  }

  const htmlId = label.toLowerCase().replaceAll(' ','-')

  return (
    <div className='FormInput'>
      <label htmlFor={htmlId}>{capitalize(label)}: </label>
      <input type={type || 'text'} className={classes && classes.join(' ')} id={htmlId} onChange={changeHandler} required={required}/>
    </div>
  )
}

export default FormInput