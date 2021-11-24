import { InputInfo } from '../utils/types'
import { capitalize } from '../utils/functions'

type InputProps = {
  inputInfo: InputInfo
  changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const FormInput: React.FC<InputProps> = (props: InputProps) => {
  const { inputInfo, changeHandler } = props
  let { type, name, classes, label, defaultValue, required } = inputInfo

  if (label.toLowerCase() === 'password') {
    type = 'password'
  }

  const htmlId = label.toLowerCase().replaceAll(' ','-')

  return (
    <div className={classes ? classes.join(' ') + ' FormInput' : 'FormInput'}>
      {type !== 'hidden' &&
        <label htmlFor={htmlId}>{capitalize(label)}: </label>
      }
      {type !== 'textarea' ?
        <input type={type || 'text'} id={htmlId} name={name || htmlId} onChange={changeHandler} defaultValue={defaultValue} required={required}/>
        :
        <textarea id={htmlId} name={name || htmlId} onChange={changeHandler} defaultValue={defaultValue} required={required}></textarea>
      }
      
    </div>
  )
}

export default FormInput