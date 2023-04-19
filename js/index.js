// Grab form element from DOM
const search = document.getElementById("form");
// console.log(search);

// Add evenListener on form for a submit
search.addEventListener("submit", (e) => {
    // Prevent submit page refresh
    e.preventDefault();

    // Grab users input
    const team = e.currentTarget.input.value;
    console.log(team);
    getVideos();
});

function getVideos() {

    // Setting endpoint to url
    const url = "https://free-football-soccer-videos.p.rapidapi.com/";

    // Creating a new request
    const request = new Request(url, {

        method: 'get',
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'free-football-soccer-videos.p.rapidapi.com'
        }

    })

    // Passing request to fetchAPI
    fetch(request)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.error('error:' + error));

}
