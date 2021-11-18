import { InputInfo } from '../utils/types'
import { capitalize } from '../utils/functions'

type InputProps = InputInfo & {changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void}

const FormInput: React.FC<InputProps> = (props: InputProps) => {
  let { type, classes, label, changeHandler, required } = props
  
  if (label.toLowerCase() === 'password') {
    type = 'password'
  }

  const htmlId = label.toLowerCase().replaceAll(' ','-')

  return (
    <div className={classes ? classes.join(' ') + ' FormInput' : 'FormInput'}>
      <label htmlFor={htmlId}>{capitalize(label)}: </label>
      <input type={type || 'text'} id={htmlId} onChange={changeHandler} required={required}/>
    </div>
  )
}

export default FormInput