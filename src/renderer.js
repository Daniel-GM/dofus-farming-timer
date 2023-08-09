const content = document.getElementById("content")
const close = document.getElementById("close")
const timer = document.getElementById("timer")
const btn = document.getElementById("btn")
const spawn = document.getElementById("spawn")
let segundosStart

window.addEventListener('load', () => {
  document.getElementById('spawn').focus()
})

btn.addEventListener("click", () => {
  segundosStart = spawn.value

  content.style.display = "flex"

  btn.style.display = "none"
  spawn.style.display = "none"  
})

close.addEventListener("click", () => {
  window.api.close()
})

updateClock()
setInterval(updateClock, 1000)

setInterval(() => {
  segundosStart = (Number(segundosStart) + 0.0333) % 60
}, 60000)

function updateClock() {
  const now = new Date()
  const timeInSeconds = Math.floor(now.getTime() / 1000)

  const minutes = Math.floor((timeInSeconds % 3600) / 60)
  const seconds = timeInSeconds % 60

  if (segundosStart < 10) {
    if (seconds >= (60 + segundosStart - 10) || seconds < segundosStart) {
      timer.style.color = "red"
    } else {
      timer.style.color = "green"
    }
  } else {
    if (seconds >= (segundosStart - 10) && seconds < segundosStart) {
      timer.style.color = "red"
    } else {
      timer.style.color = "green"
    }
  }

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  
  console.log(segundosStart)
  timer.textContent = formattedTime
}
