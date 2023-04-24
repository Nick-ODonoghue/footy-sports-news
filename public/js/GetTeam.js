const axios = require('axios')

const getTeams = async (teamName) => {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
    params: { name: teamName },
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
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
