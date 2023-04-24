// Front-end async funtion calling the backend and passing users team as a parametor
export const getTeams = async (teamName) => {
  const options = {
    method: 'GET',
    // Function calling our backend URL route defined in our index.js
    url: 'http://localhost:5555/team',
    // Passing users input as a parametor
    params: { name: teamName },
  }

  try {
    const response = await axios.request(options)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
