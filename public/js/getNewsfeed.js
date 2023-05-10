// Front-end async function calling /newsfeed
export const newsFeed = async () => {
  const url = new URL('/newsfeed', window.location.href)

  try {
    // Send get request to /newsfeed
    const response = await fetch(url.toString())
    // Parse response into json
    const newsArticles = await response.json()
    // console.log(newsArticles)
    setNewsFeed(newsArticles)

  } catch (error) {
    console.log(error)
  }

}

// Function to inject news articles into our breaking news footer
const setNewsFeed = (articles) => {

}
