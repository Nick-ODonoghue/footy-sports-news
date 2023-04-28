import { getLeague } from './getLeague.js'
// Front-end async funtion calling the backend and passing users team as a parametor
export const getTeams = async (teamName) => {
  // Create a new instance of URL
  const url = new URL('http://localhost:5555/team')
  // Append users input to the URL object
  url.searchParams.append('name', teamName)

  try {
    // Send get request to my backend server
    const response = await fetch(url.toString())
    const dataResponse = await response.json()
    console.log(dataResponse)

    // Grabbing team ID of users input and passing as an argument into getLeague function
    const teamID = dataResponse[0].team.id

    getLeague(teamID)

    // Loop through the data
    dataResponse.forEach((teams) => {
      // Grab the teams logo url
      const teamLogo = teams.team.logo
      const teamCountry = teams.team.country
      const teamFounded = teams.team.founded
      const teamStadiumName = teams.venue.name
      const teamStadiumCapacity = teams.venue.capacity

      // Pass the url to the setImage function
      setTeamInfo(teamLogo, teamCountry, teamFounded, teamStadiumName, teamStadiumCapacity)
    })
  } catch (error) {
    console.error(error)
  }
}

// Function to inject team logo
const setTeamInfo = (teamLogo, teamCountry, teamFounded, teamStadiumName, teamStadiumCapacity) => {
  // Grab DOM elements
  const logoSection = document.querySelector('.team__logo')
  const infoSection = document.querySelector('.team__info')

  // Create new elements and set classes
  const imgEl = document.createElement('img')
  imgEl.classList.add('team__logo')
  const countryEl = document.createElement('p')
  const foundedEl = document.createElement('p')
  const stadiumNameEl = document.createElement('p')
  const stadiumCapacityEl = document.createElement('p')

  // Set new img elements src to logo URL passed in as an argument
  imgEl.src = teamLogo
  countryEl.innerHTML = teamCountry
  foundedEl.innerHTML = teamFounded
  stadiumNameEl.innerHTML = teamStadiumName
  stadiumCapacityEl.innerHTML = teamStadiumCapacity

  // Inject logo into html
  logoSection.appendChild(imgEl)
  infoSection.appendChild(countryEl)
  infoSection.appendChild(foundedEl)
  infoSection.appendChild(stadiumNameEl)
  infoSection.appendChild(stadiumCapacityEl)
}
