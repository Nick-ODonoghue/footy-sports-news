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
  // Grab DOM element
  const newsFeedContainer = document.querySelector('.newsfeed')
  // console.log(newsFeedContainer)

  let totalWidth = 0

  articles.forEach((article) => {

    // Create elements and add classes
    const breakingEl = document.createElement('span')
    breakingEl.classList.add('breaking__news')
    const newsFeedEl = document.createElement('span')
    newsFeedEl.classList.add('newsfeed__txt')

    // Push our data into the new elements
    breakingEl.textContent = 'breaking news'
    newsFeedEl.textContent = article.title

    // Push elements into our marquee
    newsFeedContainer.appendChild(breakingEl)
    newsFeedContainer.appendChild(newsFeedEl)

    // To fix the issue I'm having with the newsFeed only scrolling as much data as the width of the newsFeed element I'm applying the entire width of all news articles to the newsFeedContainer element
    totalWidth += breakingEl.offsetWidth + newsFeedEl.offsetWidth

  })

  newsFeedContainer.style.width = totalWidth + 'px'

}
