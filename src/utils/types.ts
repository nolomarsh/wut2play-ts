export type loginInfo = {
  username: string
  password: string
}

export type InputProps = {
  label: string
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  classes?: string[]
}