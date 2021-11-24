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