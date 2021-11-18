import { useState, FC } from 'react'
import { useAppDispatch } from '../utils/hooks'
import { FormProps } from '../utils/types'
import FormFieldset from './FormFieldset'
import FormInput from './FormInput'

const DispatchForm: FC<FormProps> = (props: FormProps) => {
  const dispatch = useAppDispatch()

  const { onSubmit, fields, doesDispatch } = props

  const [formData, setFormData] = useState({})

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.id]: event.target.value})
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
          const { label, type, classes, required } = field
          return(
            <FormInput 
              label={label}
              type={type}
              classes={classes}
              required={required}
              changeHandler={handleFormChange}
              key={index}
            />
          )
        }
      })}
    </form>
  )
}

export default DispatchForm