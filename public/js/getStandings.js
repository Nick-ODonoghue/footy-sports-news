// Front-end async funtion calling the backend and passing users team LeagueID as a parametor
export const getStandings = async (leagueID) => {
  const url = new URL('http://localhost:5555/standings')
  // Append users leagueID that was pulled from getLeague function dataResponse
  url.searchParams.append('id', leagueID)

  try {

    const response = await fetch(url.toString())
    const dataResponse = await response.json()
    // console.log(`Data from getStandings:`, dataResponse)

    const { league } = dataResponse[0]
    const standings = league.standings

    // Clear all data from our league__table element incase the user does more than one search
    const table = document.querySelector('.league__table')
    table.innerHTML = ''

    standings.forEach((teamObj) => {
      teamObj.forEach((team) => {
        // setTeamForm(team)
        leagueTable(team)
      })
    })

  } catch (error) {
    console.error(error)
  }
}

// Function to inject team form data into HTML
const setTeamForm = (teams) => {
  // Grab DOM element
  const teamFormSection = document.querySelector(".team__form")

  // Extract the data needed from the team objects
  const teamName = teams.team.name
  const teamForm = teams.form

  // Create new elements & add classes
  const teamDivEl = document.createElement('div')
  teamDivEl.classList.add('team__form__container')
  const nameEl = document.createElement('h3')
  nameEl.classList.add('team__form__name')
  const formEl = document.createElement('p')
  formEl.classList.add('team__form')

  // Pass new elements the data
  nameEl.innerHTML = teamName
  formEl.innerHTML = teamForm

  // Inject data elements into newly created div
  teamDivEl.appendChild(nameEl)
  teamDivEl.appendChild(formEl)

  // Inject new div's into the HTML
  teamFormSection.appendChild(teamDivEl)
}

// Function to create league tabel
const leagueTable = (teams) => {
  // Grab DOM element
  const table = document.querySelector('.league__table')

  // Extract data needed from teams parameter
  const logo = teams.team.logo
  const rank = teams.rank
  const name = teams.team.name
  const played = teams.all.played
  const won = teams.all.win
  const draw = teams.all.draw
  const lost = teams.all.lose
  const points = teams.points
  const goalsFor = teams.all.goals.for
  const goalsAgainst = teams.all.goals.against

  // Create elements & add classes if needed
  const leagueDivEl = document.createElement('div')
  leagueDivEl.classList.add('league__container')
  const teamDivEl = document.createElement('div')
  teamDivEl.classList.add('league__team__container')
  const teamStatDivEl = document.createElement('div')
  teamStatDivEl.classList.add('league__teamStat__container')
  const teamLogoEl = document.createElement('img')
  teamLogoEl.classList.add('league__team__logo')
  const teamRankEl = document.createElement('p')
  teamRankEl.classList.add('league__team__rank')
  const teamNameEl = document.createElement('h3')
  teamNameEl.classList.add('league__team__name')
  const teamPlayedEl = document.createElement('p')
  teamPlayedEl.classList.add('league__team__text')
  const teamWonEl = document.createElement('p')
  teamWonEl.classList.add('league__team__text')
  const teamdrawEl = document.createElement('p')
  teamdrawEl.classList.add('league__team__text')
  const teamlostEl = document.createElement('p')
  teamlostEl.classList.add('league__team__text')
  const teamPointsEl = document.createElement('p')
  teamPointsEl.classList.add('league__team__text')
  teamPointsEl.classList.add('league__team--bold')
  const teamGoalsForEl = document.createElement('p')
  teamGoalsForEl.classList.add('league__team__text')
  const teamGoalsAgainstEl = document.createElement('p')
  teamGoalsAgainstEl.classList.add('league__team__text')

  // Pass elements data
  teamLogoEl.src = logo
  teamRankEl.innerHTML = rank
  teamNameEl.innerHTML = name
  teamPlayedEl.innerHTML = played
  teamWonEl.innerHTML = won
  teamdrawEl.innerHTML = draw
  teamlostEl.innerHTML = lost
  teamPointsEl.innerHTML = points
  teamGoalsForEl.innerHTML = goalsFor
  teamGoalsAgainstEl.innerHTML = goalsAgainst

  // Inject elements into containers
  teamDivEl.appendChild(teamLogoEl)
  teamDivEl.appendChild(teamRankEl)
  teamDivEl.appendChild(teamNameEl)
  teamStatDivEl.appendChild(teamPlayedEl)
  teamStatDivEl.appendChild(teamWonEl)
  teamStatDivEl.appendChild(teamdrawEl)
  teamStatDivEl.appendChild(teamlostEl)
  teamStatDivEl.appendChild(teamPointsEl)
  teamStatDivEl.appendChild(teamGoalsForEl)
  teamStatDivEl.appendChild(teamGoalsAgainstEl)
  leagueDivEl.appendChild(teamDivEl)
  leagueDivEl.appendChild(teamStatDivEl)

  // Inject all data onto page
  table.append(leagueDivEl)
}
