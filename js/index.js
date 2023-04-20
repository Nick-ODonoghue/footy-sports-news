// Grab elements from DOM
const search = document.getElementById("form")

// Add evenListener on form for a submit
search.addEventListener("submit", (e) => {
    // Prevent submit page refresh
    e.preventDefault();

    // Grab users team name input
    const team = e.currentTarget.input.value;

    // Call getVideos function and pass users team name as argument
    // getVideos(team)
    // getTeamData()
    teamData(team)
});

// Function using `free-football-soccer-videos` to get back data on users team taking team as a parameter
function getVideos(team) {

    // Setting endpoint to url
    const url = "https://free-football-soccer-videos.p.rapidapi.com/"

    // Creating a new request instance
    const request = new Request(url, {

        method: 'get',
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'free-football-soccer-videos.p.rapidapi.com'
        }

    })

    // Passing new request to fetchAPI
    fetch(request)
        .then(response => response.json())

        // Itterate over data returned & grab all game.titles as well as their country code{id}
        // .then(data => {
        //     data.forEach(game => {
        //         console.log(`${game.competition.id} - ${game.title}`)
        //     })
        // })

        // Itterating over data returned looking for users team & return any games found
        // .then(data => {
        //     data.forEach(game => {
        //         if (game.side1.name === team || game.side2.name === team) {
        //             console.log(game)
        //         }
        //     })
        // })
        .catch(error => console.error('error:' + error))
}

// Function using API-Football
function teamData(team) {

    const url = `https://api-football-v1.p.rapidapi.com/v3/teams?name=${team}`

    const request = new Request(url, {

        method: 'get',
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }

    })

    fetch(request)
        .then(response => response.json())
        .then(data => {
            const dataResponse = data.response

            // Loop through dataResponse incase more than one team is returned
            dataResponse.forEach(teams => {
                // Grab needed data
                const teamLogo = teams.team.logo
                const teamName = teams.team.name
                const teamId = teams.team.id

                // Call setImage function and pass it the logo URL
                setImage(teamLogo)
                console.log(teamId, teamName)
            })
        })
        .catch(error => console.error("error:" + error))
}

// Function to inject team logo
const setImage = (imgUrl) => {

    // Grab DOM element
    const contentLg = document.querySelector(".content-lg")
    // Create new img element
    const imgElement = document.createElement("img")

    // Set new img elements src to logo URL passed in as an argument
    imgElement.src = imgUrl
    // Inject logo into html
    contentLg.appendChild(imgElement)
}
