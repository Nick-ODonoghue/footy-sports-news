import { getStandings } from './getStandings.js'
// Front-end async funtion calling the backend and passing users teamID as a parametor
export const getLeague = async (teamID) => {
  const url = new URL('http://localhost:5555/league')
  // Append users team ID that was pulled from getTeams function dataResponse
  url.searchParams.append('id', teamID)

  try {

    const response = await fetch(url.toString())
    const dataResponse = await response.json()
    console.log(dataResponse)

    // Set empty variable to hole the teams league ID
    let leagueID

    // Loop through the returned data
    for (let i = 0; i < dataResponse.length; i++) {
      // Assign each returned object to a variable
      const obj = dataResponse[i].league

      // Return the league ID of the first object of type 'league'
      if (obj.type === 'League') {
        leagueID = obj.id
        break
      }
    }

    getStandings(leagueID)

  } catch (error) {
    console.error(error)
  }
}
