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
  // Reset element in case user does more than one search
  squadSection.innerHTML = ''

  players.forEach((player) => {
    console.log(player)

    // Create elements and add classes if needed
    const playerCardEl = document.createElement('div')
    playerCardEl.classList.add('squad__player-card')
    const playerDataEl = document.createElement('div')
    playerDataEl.classList.add('squad__player-data')
    const nameEl = document.createElement('h3')
    nameEl.classList.add('squad__player-name')
    const ageEl = document.createElement('p')
    ageEl.classList.add('squad__player-age')
    const positionEl = document.createElement('p')
    positionEl.classList.add('squad__player-position')
    const imgEl = document.createElement('img')
    imgEl.classList.add('squad__player-img')

    // Push data into new elements
    nameEl.innerHTML = player.name
    ageEl.innerHTML = player.age
    positionEl.innerHTML = player.position
    imgEl.src = player.photo

    // Push data into our squad__container element
    playerDataEl.appendChild(nameEl)
    playerDataEl.appendChild(ageEl)
    playerDataEl.appendChild(positionEl)

    playerCardEl.appendChild(imgEl)
    playerCardEl.appendChild(playerDataEl)

    squadSection.append(playerCardEl)

  })

}
