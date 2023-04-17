// Grab form element from DOM
const search = document.getElementById("form");
// console.log(search);

// Add evenListener on form for a submit
search.addEventListener("submit", (event) => {
    // Prevent submit page refresh
    event.preventDefault();

    // Grab users team search
    const team = event.currentTarget.input.value;
    console.log(team);
    getVideos();
});

async function getVideos() {

    const url = "https://free-football-soccer-videos.p.rapidapi.com/";

    const options = {
        method: 'get',
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'free-football-soccer-videos.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.error('error:' + error));
}
