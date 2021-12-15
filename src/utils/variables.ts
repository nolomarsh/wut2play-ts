export let apiUrl = 'http://localhost:3001/'

if(process.env.DATABASE_URL) {
  apiUrl = process.env.DATABASE_URL
}

// 'https://wut2play-api.herokuapp.com/'