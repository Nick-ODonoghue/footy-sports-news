// Time & date function exported and called in main.js
export const displayDate = () => {

  // Grab DOM elements
  const timeEl = document.querySelector('.time')
  const ampmEl = document.querySelector('.ampm')
  const hourEl = document.querySelector('.hours')
  const minutesEl = document.querySelector('.minutes')
  const dayEl = document.querySelector('.day')
  const monthEl = document.querySelector('.month')
  const dayNumEl = document.querySelector('.day__number')

  // Set weekday & month arrays
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const monthText = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  // Set current date, month, day, hours & minutes
  const dateTime = new Date()
  const month = monthText[dateTime.getMonth()]
  const day = weekday[dateTime.getDay()]
  const dayNum = dateTime.getDay()
  const hours = dateTime.getHours()
  const minutes = dateTime.getMinutes()

  // Condition for am or pm
  if (hours >= 12) {
    ampmEl.innerHTML = 'pm'
  } else {
    ampmEl.innerHTML = 'am'
  }

  // Condition to add 0 before 10 minutes past the hour
  if (minutes < 10) {
    minutesEl.innerHTML = `0${minutes}`
  } else {
    minutesEl.innerHTML = minutes
  }

  // Push dates & time
  hourEl.innerHTML = `${hours}.`
  dayEl.innerHTML = day
  monthEl.innerHTML = month
  dayNumEl.innerHTML = dayNum

}
