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
        console.log(team.form)
      })
    })

  } catch (error) {
    console.error(error)
  }
}
