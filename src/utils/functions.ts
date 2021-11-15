import { pbkdf2 } from "crypto"

export function capitalize (str: string){
  const regex = /(\b)[a-z](?!\b)/g
  return str.replace(regex, (match) => {
    return match.toUpperCase()
  })
}