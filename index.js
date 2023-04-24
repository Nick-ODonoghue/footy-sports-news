// Grab packages
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const { getTeams } = require('./public/js/GetTeam')
const API_KEY = process.env.API_KEY


// Set port
const PORT = process.env.PORT || 5555

const app = express()

// Enable CORS
app.use(cors())

// Set up routes
app.get('/', (req, res) => {
  res.json('Hi')
})

app.get('/team', async (req, res) => {

  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
    params: { name: 'arsenal' },
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  }

  try {
    const response = await axios.request(options)
    res.json(response.data)
  } catch (error) {
    console.error(error)
  }

})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
