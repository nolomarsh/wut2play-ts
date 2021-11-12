import { InputProps } from '../utils/types'

const FormInput: React.FC<InputProps> = (props: InputProps) => {
  const { type, classes, label, changeHandler } = props


  return (
    <>
      <label htmlFor={label.toLowerCase()}>{label}: </label>
      <input type={type || 'text'} className={classes && classes.join(' ')} id={label.toLowerCase()} onChange={changeHandler} />
    </>
  )
}

export default FormInput