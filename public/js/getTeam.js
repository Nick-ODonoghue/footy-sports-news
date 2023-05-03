import { getLeague } from './getLeague.js'
import { getSquad } from './getSquad.js'

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
    // console.log(`teamData from getTeam:`, dataResponse)

    // Destructure dataResponce array to grab the first element, as dataResponse could return more than one team
    const [teamData] = dataResponse
    // console.log(`teamData:`, teamData)

    // Destructure teamData object
    const { team, venue } = teamData

    // Grab team ID of users input and pass as an argument into getLeague & getSquad functions
    const teamID = team.id
    getLeague(teamID)
    getSquad(teamID)
    // console.log(`TeamID:`, teamID)

    // Grab the team data needed
    const teamLogo = team.logo
    const teamCountry = team.country
    const teamFounded = team.founded
    const teamStadiumName = venue.name
    const teamStadiumCapacity = venue.capacity

    // Pass selected tead data into setTeamInfo function
    setTeamInfo(teamLogo, teamCountry, teamFounded, teamStadiumName, teamStadiumCapacity)

  } catch (error) {
    console.error(error)
  }
}

// Function to inject team data into team Info section of web app
const setTeamInfo = (teamLogo, teamCountry, teamFounded, teamStadiumName, teamStadiumCapacity) => {
  // Grab DOM elements
  const logoSection = document.querySelector('.team__logo')
  const infoSection = document.querySelector('.team__info')
  const teamLocation = document.querySelector('.team__location')
  const teamFound = document.querySelector('.team__founded')
  const teamStadium = document.querySelector('.team__stadium')
  const teamCapacity = document.querySelector('.team__capacity')

  // Create new elements and set classes
  // const imgEl = document.createElement('img')
  // imgEl.classList.add('team__logo')
  // const countryEl = document.createElement('p')
  // const foundedEl = document.createElement('p')
  // const stadiumNameEl = document.createElement('p')
  // const stadiumCapacityEl = document.createElement('p')

  // Push data into new elements
  logoSection.src = teamLogo
  teamLocation.innerText = `Location - ${teamCountry}`
  teamFound.innerText = `Founded - ${teamFounded}`
  teamStadium.innerText = `Ground - ${teamStadiumName}`
  teamCapacity.innerHTML = teamStadiumCapacity

  // Clear all data for more than one user search
  // logoSection.innerText = ''
  // infoSection.innerText = ''

  // Inject data into html
  // logoSection.appendChild(imgEl)
  // infoSection.appendChild(countryEl)
  // infoSection.appendChild(foundedEl)
  // infoSection.appendChild(stadiumNameEl)
  // infoSection.appendChild(stadiumCapacityEl)
}
