import { getLeague } from './getLeague.js'
import { getSquad } from './getSquad.js'

// Front-end async funtion calling the backend and passing users team as a parametor
export const getTeams = async (teamName) => {
  // Create a new instance of URL
  // const url = new URL('http://localhost:5555/team')
  const url = new URL('/team', window.location.href)
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
  const teamLogoEl = document.querySelector('.team__logo-container')
  const infoSectionEl = document.querySelector('.team__info-container')
  // const teamLocationEl = document.querySelector('.team__location')
  // const teamFoundEl = document.querySelector('.team__founded')
  // const teamStadiumEl = document.querySelector('.team__stadium')
  // const teamCapacityEl = document.querySelector('.team__capacity')

  // Create new elements and set classes
  const imgEl = document.createElement('img')
  imgEl.classList.add('team__logo')
  const countryEl = document.createElement('p')
  countryEl.classList.add('team__info-text')
  const foundedEl = document.createElement('p')
  foundedEl.classList.add('team__info-text')
  const stadiumNameEl = document.createElement('p')
  stadiumNameEl.classList.add('team__info-text')
  const capacityEl = document.createElement('p')
  capacityEl.classList.add('team__info-text')

  // Push data into new elements
  imgEl.setAttribute('src', teamLogo)
  countryEl.textContent = `Location - ${teamCountry}`
  foundedEl.textContent = `Founded - ${teamFounded}`
  stadiumNameEl.textContent = `Ground - ${teamStadiumName}`
  capacityEl.textContent = `Capacity - ${teamStadiumCapacity}`

  // Clear all data for more than one user search
  teamLogoEl.innerHTML = ''
  infoSectionEl.innerHTML = ''

  // Inject data into html
  teamLogoEl.append(imgEl)
  infoSectionEl.appendChild(countryEl)
  infoSectionEl.appendChild(foundedEl)
  infoSectionEl.appendChild(stadiumNameEl)
  infoSectionEl.appendChild(capacityEl)
}
