// Front-end async funtion calling the backend and passing users teamID as a parametor
export const getLeague = async (teamID) => {
  const url = new URL('http://localhost:5555/league')
  // Append users team ID that was pulled from getTeams function dataResponse
  url.searchParams.append('id', teamID)

  try {

    const response = await fetch(url.toString())
    const dataResponse = await response.json()
    console.log(dataResponse)

  } catch (error) {
    console.error(error)
  }
}
