import { useState, FC } from 'react'
import { useAppDispatch } from '../utils/hooks'
import { FormProps } from '../utils/types'
import FormFieldset from './FormFieldset'

const DispatchForm: FC<FormProps> = (props: FormProps) => {
  const dispatch = useAppDispatch()

  const { submitActionCreator, fieldsets } = props

  const [formData, setFormData] = useState({})

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.id]: event.target.value})
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(submitActionCreator(formData))
  }

  return (
    <form className='dispatchForm' onSubmit={handleFormSubmit}>
      {fieldsets.map((fieldset) => {
        const { legend, inputs, includeSubmit } = fieldset;
        return (<FormFieldset 
          legend={legend}
          inputs={inputs}
          includeSubmit={includeSubmit}
          changeHandler={handleFormChange}
        />)
      })}
    </form>
  )
}

export default DispatchForm