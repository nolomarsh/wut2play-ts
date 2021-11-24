import { InputInfo } from '../utils/types'
import { capitalize } from '../utils/functions'

type InputProps = {
  inputInfo: InputInfo
  changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
/**
 * Creates a paired label-input combination based on specifications
 * @param changeHandler a function that will be called when the input changes
 * @param inputInfo an object with a label property and any of the following optional properties:
 * 
 * - name - the name of the property you want the data stored in, if different from label
 * - type - the type of the input, defaults to text unless label is password (then defaults to password), also accepts textarea
 * - classes - any classes you would like added to the div containing the label and input
 * - required - mark true if input is a required field
 * - defaultValue - provides a default value to the field; defaults to 0 for a number input or '' otherwise
 */
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