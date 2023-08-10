const close = document.getElementById("close")
const back = document.getElementById("back")

const timer1 = document.getElementById("timer1")
const timer2 = document.getElementById("timer2")
const timer3 = document.getElementById("timer3")
const timer4 = document.getElementById("timer4")

const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const btn3 = document.getElementById("btn3")
const btn4 = document.getElementById("btn4")

const back1 = document.getElementById("back1")
const back2 = document.getElementById("back2")
const back3 = document.getElementById("back3")
const back4 = document.getElementById("back4")

const spawn1 = document.getElementById("spawn1")
const spawn2 = document.getElementById("spawn2")
const spawn3 = document.getElementById("spawn3")
const spawn4 = document.getElementById("spawn4")

let segundosStart = {}

function addResetTimer(back, timer, btn, spawn) {
  back.addEventListener("click", () => {
    timer.style.display = "none"
    spawn.style.display = "none"
    btn.style.display = "block"
  })
}

addResetTimer(back1, timer1, btn1, spawn1)
addResetTimer(back2, timer2, btn2, spawn2)
addResetTimer(back3, timer3, btn3, spawn3)
addResetTimer(back4, timer4, btn4, spawn4)

function addClickEvent(btn, timer, spawn) {
  btn.addEventListener("click", () => {
    const now = new Date()
    const timeInSeconds = Math.floor(now.getTime() / 1000)
    const seconds = (timeInSeconds % 60)
    segundosStart[timer.id] = seconds
    spawn.textContent = segundosStart[timer.id]

    timer.style.display = "flex"
    spawn.style.display = "block"
    btn.style.display = "none"
  })
}

addClickEvent(btn1, timer1, spawn1)
addClickEvent(btn2, timer2, spawn2)
addClickEvent(btn3, timer3, spawn3)
addClickEvent(btn4, timer4, spawn4)

close.addEventListener("click", () => {
  window.api.close()
})

function updateTimer(timer) {
  const now = new Date()
  const timeInSeconds = Math.floor(now.getTime() / 1000)

  const minutes = Math.floor((timeInSeconds % 3600) / 60)
  const seconds = timeInSeconds % 60

  if (segundosStart[timer.id] < 10) {
    if (seconds >= (60 + segundosStart[timer.id] - 10) || seconds < segundosStart[timer.id]) {
      timer.style.color = "red"
    } else {
      timer.style.color = "green"
    }
  } else {
    if (seconds >= (segundosStart[timer.id] - 10) && seconds < segundosStart[timer.id]) {
      timer.style.color = "red"
    } else {
      timer.style.color = "green"
    }
  }

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  
  console.log(segundosStart[timer.id])
  timer.textContent = formattedTime
}

setInterval(() => {
  updateTimer(timer1)
  updateTimer(timer2)
  updateTimer(timer3)
  updateTimer(timer4)
}, 10)

setInterval(() => {
  Object.keys(segundosStart).forEach(key => {
    segundosStart[key] = (Number(segundosStart[key]) + 0.0333) % 60
    const seconds = parseFloat(segundosStart[key]).toFixed(4)
    switch (key) {
      case "timer1":
        spawn1.textContent = seconds
        break
      case "timer2":
        spawn2.textContent = seconds
        break
      case "timer3":
        spawn3.textContent = seconds
        break
      case "timer4":
        spawn4.textContent = seconds
        break
      default:
        break
    }
  })
}, 60000)