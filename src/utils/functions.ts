import { User, GameEntry } from './types'

/**
 * capitalizes the first letter of every word in the string
 * @param str the string to be altered
 * @returns the altered string
 */
export function capitalize (str: string){
  const regex = /(\b)[a-z](?!\b)/g
  return str.replace(regex, (match) => {
    return match.toUpperCase()
  })
}

/**
 * Takes a piece of state and determines whether it is one of the initialStates used in the project or not
 * @param stateObj the piece of state to be checked
 * @returns true if it is an initial state (they all have id -1)
 */
export function isInitial (stateObj: User | GameEntry | User[] | GameEntry[]) {
  if (Array.isArray(stateObj)){
    if (stateObj[0].id === -1) {
      return true
    } else {
      return false
    }
  } else {
    if (stateObj.id === -1) {
      return true
    } else {
      return false
    }
  }
}