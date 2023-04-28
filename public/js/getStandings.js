// Front-end async funtion calling the backend and passing users team LeagueID as a parametor
export const getStandings = async (leagueID) => {
  const url = new URL('http://localhost:5555/standings')
  // Append users leagueID that was pulled from getLeague function dataResponse
  url.searchParams.append('id', leagueID)

  try {

    const response = await fetch(url.toString())
    const dataResponse = await response.json()
    console.log(dataResponse)

    const { league } = dataResponse[0]
    const standings = league.standings
    standings.forEach((teamObj) => {
      teamObj.forEach((team) => {
        const teamName = team.team.name
        const teamForm = team.form
        console.log(teamName, teamForm)
        setTeamForm(teamName, teamForm)
      })
    })

  } catch (error) {
    console.error(error)
  }
}

// Function to inject team form data into HTML
const setTeamForm = (teamName, teamForm) => {
  // Grab DOM element
  const teamFormSection = document.querySelector(".team__form")

  // Create new elements & add classes
  const teamDivEl = document.createElement('div')
  teamDivEl.classList.add('form__team')
  const nameEl = document.createElement('h3')
  nameEl.classList.add('form__team__name')
  const formEl = document.createElement('p')
  formEl.classList.add('form__team__form')

  // Pass new elements the data
  nameEl.innerHTML = teamName
  formEl.innerHTML = teamForm

  // Inject data elements into newly created div
  teamDivEl.appendChild(nameEl)
  teamDivEl.appendChild(formEl)

  // Inject new div's into the HTML
  teamFormSection.appendChild(teamDivEl)
}
