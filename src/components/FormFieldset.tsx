import FormInput from './FormInput'
import { capitalize } from '../utils/functions'
import { FieldsetInfo } from '../utils/types'

type FieldsetProps = FieldsetInfo & {changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void}

const FormFieldset: React.FC<FieldsetProps> = (props: FieldsetProps) => {
  const { legend, changeHandler, inputs, includeSubmit } = props

  return (
    <fieldset className={`FormFieldset ${legend.toLowerCase().replace(' ','-')}-field`}>
      {legend && <legend>{capitalize(legend)}</legend>}
      { inputs.map((input, index) => {
        return (<FormInput
          inputInfo={input}
          changeHandler={changeHandler}
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