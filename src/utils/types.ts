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

export type FieldsetProps = {
  legend: string
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputs: (string | InputInfo)[]
  includeSubmit?: boolean
}