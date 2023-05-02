// Front-end async function calling our backend and passing the users teamID as a parameter
export const getSquad = async (teamID) => {
  const url = new URL('http://localhost:5555/squad')
  // Append teamID to URL object
  url.searchParams.append('id', teamID)

  try {

    const response = await fetch(url.toString())
    const dataResponse = await response.json()
    console.log(dataResponse)

    // Destructure the returned array
    const [squadData] = dataResponse
    // Destructure the object from the array
    const { players, team } = squadData
    // console.log(players)
    // console.log(team)

    setPlayerCard(players)

  } catch (error) {
    console.error(error)
  }
}

const setPlayerCard = (players) => {
  // Grab DOM elements
  const squadSection = document.querySelector('.squad__container')

  players.forEach((player) => {
    console.log(player)

    // Create elements and add classes if needed
    const nameEL = document.createElement('h3')
    nameEL.classList.add('squad__player-name')
    const ageEl = document.createElement('p')
    ageEl.classList.add('squad__player-age')
    const positionEl = document.createElement('p')
    positionEl.classList.add('squad__player-position')
    const imgEl = document.createElement('img')
    imgEl.classList.add('squad__player-img')

  })

}
