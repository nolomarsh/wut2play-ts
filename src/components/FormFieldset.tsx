import FormInput from './FormInput'
import { capitalize } from '../utils/functions'
import { FieldsetInfo } from '../utils/types'

type FieldsetProps = FieldsetInfo & {changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void}

const FormFieldset: React.FC<FieldsetProps> = (props: FieldsetProps) => {
  const { legend, changeHandler, inputs, includeSubmit } = props

  return (
    <fieldset className={`FormFieldset ${legend.toLowerCase().replace(' ','-')}-field`}>
      {legend && <legend>{capitalize(legend)}</legend>}
      { inputs.map((input, index) => {
        let label: string, type, classes, required
        if (typeof input !== 'string'){
          ({ label, type, classes, required } = input)
        } else {
          label = input
        }
        return (<FormInput
          label={label}
          changeHandler={changeHandler}
          type={type}
          classes={classes}
          required={required}
          key={index}
        />)
      })}
      {includeSubmit && 
        <input type='submit' />
      }
    </fieldset>
  )
}

export default FormFieldset