// Import getTeams function
import { getTeams } from './getTeam.js'
import { displayDate } from './getDate.js'

// Grab elements from DOM
const search = document.getElementById("form")

// Add evenListener on form for a submit
search.addEventListener("submit", (e) => {
  // Prevent submit page refresh
  e.preventDefault()

  // Grab users team name from the input field
  const teamName = e.currentTarget.input.value

  // Call GetTeams function and pass user input as argument
  getTeams(teamName)
})

setInterval(displayDate, 10)
