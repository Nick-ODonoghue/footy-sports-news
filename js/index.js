// Grab form element from DOM
const search = document.getElementById("form");
// console.log(search);

// Add evenListener on form for a submit
search.addEventListener("submit", (e) => {
    // Prevent submit page refresh
    e.preventDefault();

    // Grab users team name input
    const team = e.currentTarget.input.value;

    // Call getVideos function and pass users team name as argument
    getVideos(team);
});

// Function to get back data on users team taking team as a parameter
function getVideos(team) {

    // Setting endpoint to url
    const url = "https://free-football-soccer-videos.p.rapidapi.com/";

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

        // Itterating over data returned looking for users team
        .then(data => {
            data.forEach(game => {
                if (game.side1.name === team || game.side2.name === team) {
                    console.log(game)
                }
            })
        })
        .catch(error => console.error('error:' + error));

}
