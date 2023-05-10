// Backend server, to handle our routes and API calls keeping our API key safe from the frontend
// Grab packages needed for the server
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const rateLimit = require('express-rate-limit')
const apicache = require('apicache')
const cheerio = require('cheerio')
require('dotenv').config()

// Store API key via dotenv package required above
const API_KEY = process.env.API_KEY

// Set port
const PORT = process.env.PORT || 5555

// Innitiate our express server
const app = express()

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 40
})
app.use(limiter)
app.set('trust proxy, 1')

// Enable CORS to prevent any issues
app.use(cors())

// Innitialize cache
let cache = apicache.middleware

// Set up routes
// Point express to our public folder so it will then run index.html from there once the app is uploaded on Heroku
app.use(express.static('public'))

// Set / team route to store our response from the API allowing the frontend getTeams function to pull the response data
app.get('/team', cache('1440 minutes'), async (req, res) => {

  // Grab the users input to pass into our params
  const usersTeam = req.query.name
  console.log(`Team: ${usersTeam}`)

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

// Set /league route to store our response from the API allowing the frontend getLeague function to pull the response data
app.get('/league', cache('1440 minutes'), async (req, res) => {

  // Grab query from the frontend function and pass as a param to the API call
  const teamID = req.query.id
  console.log(`Team ID: ${teamID}`)

  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
    params: { team: teamID },
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  }

  try {
    const apiRes = await axios.request(options)
    const { response } = apiRes.data
    res.json(response)

  } catch (error) {
    console.error(error)
  }
})

// Set /standings route
app.get('/standings', cache('1440 minutes'), async (req, res) => {

  // Grab query from the frontend function and pass as a param to the API call
  const leagueID = req.query.id
  console.log(`League ID: ${leagueID}`)

  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
    params: {
      season: '2022',
      league: leagueID
    },
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  }

  try {
    const apiRes = await axios.request(options)
    const { response } = apiRes.data
    res.json(response)

  } catch (error) {
    console.error(error)
  }
})

// Set /squad route
app.get('/squad', cache('1440 minutes'), async (req, res) => {

  // Grab query from the frontend function and pass as a param to the API call
  const teamID = req.query.id
  console.log(`Team ID: ${teamID}`)

  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/players/squads',
    params: { team: teamID },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  }

  try {
    const apiRes = await axios.request(options)
    const { response } = apiRes.data
    // console.log(response)
    res.json(response)

  } catch (error) {
    console.error(error)
  }

})

// Cheerio scrapper set up
const url = 'https://www.skysports.com/football/news'

// Pass axios our URL
axios(url)
  .then(response => {
    // Grab the response data and save to our html variable
    const html = response.data
    // console.log(html)

    // Load our html variable into cheerio and save to $
    const $ = cheerio.load(html)
    // console.log($)

    // Create empty array to hold our returned data
    const newsFeed = []

    // Pass the class we're searching for, for cheerio to extract, and loop through each element found
    $('.news-list__headline-link', html).each(function () {
      // Grab the text within each element and remove the whitespace
      const title = $(this).text().trim()
      // Grad the url of each element
      const url = $(this).attr('href')
      // console.log(title, url)

      // Push the results into our newsFeed array
      newsFeed.push({
        title,
        url
      })
    })
    // console.log(newsFeed)
  }).catch(error => console.log(error))

// Initiate the server to listen on our port
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
