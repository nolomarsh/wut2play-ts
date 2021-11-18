export type loginInfo = {
  username: string
  password: string
}

export type InputInfo = {
  label: string
  type?: string
  classes?: string[]
  required?: boolean
}

export type InputProps = InputInfo & {changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void}

export type FieldsetInfo = {
  legend: string
  inputs: (string | InputInfo)[]
  includeSubmit?: boolean
}

export type FieldsetProps = FieldsetInfo & {changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void}

export type FormProps = {
  onSubmit: (argument: any) => any
  fields: (FieldsetInfo | InputInfo)[]
  doesDispatch?: boolean
}