// Front-end async funtion calling the backend and passing users teamID as a parametor
export const getStandings = async (leagueID) => {
  const url = new URL('http://localhost:5555/standings')
  // Append users team ID that was pulled from getTeams function dataResponse
  url.searchParams.append('id', leagueID)

  try {

    const response = await fetch(url.toString())
    const dataResponse = await response.json()
    console.log(dataResponse)

    const { league } = dataResponse[0]
    const standings = league.standings
    standings.forEach((teamObj) => {
      teamObj.forEach((team) => {
        console.log(team.form)
      })
    })

  } catch (error) {
    console.error(error)
  }
}
