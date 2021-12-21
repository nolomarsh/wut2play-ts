export let apiUrl = 'http://localhost:3001/'

if(process.env.API_URL) {
  apiUrl = process.env.API_URL
  // 'https://wut2play-api.herokuapp.com/'
}