// Front-end async funtion calling the backend and passing users team as a parametor
// export const getTeams = async (teamName) => {
//   const options = {
//     method: 'GET',
//     // Function calling our backend URL route defined in our index.js
//     url: 'http://localhost:5555/team',
//     // Passing users input as a parametor
//     params: { name: teamName },
//   }

//   try {
//     const response = await axios.request(options)
//     console.log(response.data)
//     // Grab the response data
//     const dataResponse = response.data

//     // Loop through the data
//     dataResponse.forEach(teams => {
//       // Grab the teams logo url
//       const teamLogo = teams.team.logo
//       // Pass the url to the setImage function
//       setImage(teamLogo)
//     })
//   } catch (error) {
//     console.error(error)
//   }
// }

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
