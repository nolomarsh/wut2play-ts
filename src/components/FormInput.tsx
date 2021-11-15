import { InputProps } from '../utils/types'
import { capitalize } from '../utils/functions'

const FormInput: React.FC<InputProps> = (props: InputProps) => {
  let { type, classes, label, changeHandler } = props
  
  if (label.toLowerCase() === 'password') {
    type = 'password'
  }

  const htmlId = label.toLowerCase().replaceAll(' ','-')

  return (
    <>
      <label htmlFor={htmlId}>{capitalize(label)}: </label>
      <input type={type || 'text'} className={classes && classes.join(' ')} id={htmlId} onChange={changeHandler} />
    </>
  )
}

export default FormInput