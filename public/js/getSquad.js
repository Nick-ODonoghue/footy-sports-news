// Front-end async function calling our backend and passing the users teamID as a parameter
export const getSquad = async (teamID) => {
  const url = new URL('/squad', window.location.href)
  // const url = new URL('/squad')
  // Append teamID to URL object
  url.searchParams.append('id', teamID)

  try {

    const response = await fetch(url.toString())
    const dataResponse = await response.json()
    // console.log(dataResponse)

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
  const squadTitle = document.querySelector('.squad-heading')
  const squadHidden = document.querySelector('.squad__heading-container')

  // Reset element in case user does more than one search
  squadSection.innerHTML = ''

  squadHidden.classList.remove('hidden')

  players.forEach((player) => {
    // console.log(player)

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
    squadTitle.textContent = 'Full Squad'
    nameEl.textContent = player.name
    ageEl.textContent = `Age: ${player.age}`
    positionEl.textContent = player.position
    imgEl.setAttribute('src', player.photo)

    // Push data into our squad__container element
    playerDataEl.appendChild(nameEl)
    playerDataEl.appendChild(ageEl)
    playerDataEl.appendChild(positionEl)

    playerCardEl.appendChild(imgEl)
    playerCardEl.appendChild(playerDataEl)

    squadSection.append(playerCardEl)

  })

}
