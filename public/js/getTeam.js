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
      // Pass the url to the setImage function
      setImage(teamLogo)
    })
  } catch (error) {
    console.error(error)
  }
}

// Function to inject team logo
const setImage = (imgUrl) => {
  // Grab DOM element
  const contentLg = document.querySelector(".table")
  // Create new img element
  const imgElement = document.createElement("img")

  // Set new img elements src to logo URL passed in as an argument
  imgElement.src = imgUrl
  // Inject logo into html
  contentLg.appendChild(imgElement)
}
