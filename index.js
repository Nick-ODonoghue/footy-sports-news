// Backend server, to handle our routes and API calls keeping our API key safe from the frontend
// Grab packages needed for the server
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

// Store API key via dotenv package required above
const API_KEY = process.env.API_KEY

// Set port
const PORT = process.env.PORT || 5555

const app = express()

// Enable CORS to prevent any issues
app.use(cors())

// Set up routes
// Default route test
app.get('/', (req, res) => {
  res.json('Hi')
})

// Set /team route to store our response from the API allowing the frontend getTeams function to pull the response data
app.get('/team', async (req, res) => {

  const usersTeam = req.query.name

  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
    params: { name: usersTeam },
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  }

  try {
    const apiRes = await axios.request(options)

    // Destructure response to get only the data needed
    const { response } = apiRes.data
    res.json(response)

  } catch (error) {
    console.error(error)
  }

})

// Initiate the server to listen on our port
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
