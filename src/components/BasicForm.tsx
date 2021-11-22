import { useState, FC, useEffect } from 'react'
import { useAppDispatch } from '../utils/hooks'
import { FieldsetInfo, InputInfo } from '../utils/types'
import FormFieldset from './FormFieldset'
import FormInput from './FormInput'

type FormProps = {
  onSubmit: (argument: any) => any
  fields: (FieldsetInfo | InputInfo)[]
  doesDispatch?: boolean
}

const BasicForm: FC<FormProps> = (props: FormProps) => {
  const dispatch = useAppDispatch()
 
  const { onSubmit, fields, doesDispatch } = props

  const addDefaultValue = (inputInfo: InputInfo, accumulator: any) => {
    let defaultValue
    if (inputInfo.defaultValue) {
      defaultValue = inputInfo.defaultValue
    } else if (inputInfo.type === 'number') {
      defaultValue = 0
    } else {
      defaultValue = ''
    }
    return accumulator = {...accumulator, [inputInfo.name || inputInfo.label]: defaultValue}
  }

  const generateInitialState = () => {
    let initialState = {}
    for(let field of fields) {
      if ('label' in field) {
        initialState = addDefaultValue(field, initialState)
      } 
      if ('legend' in field) {
        for (let input of field.inputs) {
          initialState = addDefaultValue(input, initialState)
        }
      }
    }
    return initialState
  }

  const [formData, setFormData] = useState(generateInitialState())

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
        } else if ('label' in field){
          return (
            <FormInput 
              inputInfo={field}
              changeHandler={handleFormChange}
              key={index}
            />
          )
        } else {
          return <></>
        }
      })}
    </form>
  )
}

export default BasicForm