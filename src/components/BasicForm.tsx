import { useState } from 'react'
import { useAppDispatch } from '../utils/hooks'
import { FieldsetInfo, InputInfo } from '../utils/types'
import FormFieldset from './FormFieldset'
import FormInput from './FormInput'

type FormProps = {
  onSubmit: (argument: any) => any
  fields: (FieldsetInfo | InputInfo)[]
  doesDispatch?: boolean
}

const BasicForm: React.FC<FormProps> = (props: FormProps) => {
  const dispatch = useAppDispatch()
 
  const { onSubmit, fields, doesDispatch } = props

  // Programatically generates an appropriate initialState object from the form's inputs

  const generateInitialState = () => {
    let initialState = {}

    // A helper function to dry out the loop, checks for a defaultValue and sets that property to the initialState, using an appropriately typed falsey value if no defaultValue is provided
    const addDefaultValue = (inputInfo: InputInfo) => {
      let defaultValue
      if (inputInfo.defaultValue) {
        defaultValue = inputInfo.defaultValue
      } else if (inputInfo.type === 'number') {
        defaultValue = 0
      } else {
        defaultValue = ''
      }
      return initialState = {...initialState, [inputInfo.name || inputInfo.label]: defaultValue}
    }

    for(let field of fields) {
      if ('label' in field) {
        initialState = addDefaultValue(field)
      } 
      if ('legend' in field) {
        for (let input of field.inputs) {
          initialState = addDefaultValue(input)
        }
      }
    }
    return initialState
  }

  const checkForSubmit =  () => {
    for (let field of fields) {
      if ('legend' in field && field.includeSubmit) {
        return true
      }
    }
    return false
  }

  const [formData, setFormData] = useState(generateInitialState())
  const [submitIncluded] = useState(checkForSubmit())

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const handleFormSubmitWithDispatch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(onSubmit(formData))
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <form className='basicForm' onSubmit={doesDispatch ? handleFormSubmitWithDispatch : handleFormSubmit}>
      {fields.map((field, index) => {
        if ('legend' in field){
          const { legend, inputs, includeSubmit } = field;
          return (<FormFieldset 
            legend={legend}
            inputs={inputs}
            includeSubmit={includeSubmit}
            changeHandler={handleFormChange}
            key={index}
          />)
        }
        if ('label' in field){
          return (
            <FormInput 
              inputInfo={field}
              changeHandler={handleFormChange}
              key={index}
            />
          )
        }
      })}
      {!submitIncluded && 
        <input type='submit'></input>
      }
    </form>
  )
}

export default BasicForm