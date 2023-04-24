const axios = require('axios')
require('dotenv').config()

const API_KEY = process.env.API_KEY

const getTeams = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:5555/team',
    params: { name: 'arsenal' },
  }

  try {
    const response = await axios.request(options)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getTeams
}
