const form = document.querySelector("#form-habits")
const nlwSetup = new NLWSetup(form)
const button = document.querySelector("header button")
let localClock = document.getElementById("localClock")

button.addEventListener("click", add)
form.addEventListener("change", save)

function add() {
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5)
  const dayExists = nlwSetup.dayExists(today)

  if (dayExists) {
    alert("Dia já incluso")
    return
  }

  alert("Adicionado com sucesso ✅")
  nlwSetup.addDay(today)
}

function save() {
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data))
}

function showClock() {
  let clock = new Date()

  clock.hours =
    clock.getHours() < 10 ? "0" + clock.getHours() : clock.getHours()
  clock.minutes =
    clock.getMinutes() < 10 ? "0" + clock.getMinutes() : clock.getMinutes()
  clock.seconds =
    clock.getSeconds() < 10 ? "0" + clock.getSeconds() : clock.getSeconds()

  let showClock = `Hora: ${clock.hours}:${clock.minutes}:${clock.seconds}`
  localClock.innerHTML = showClock
}

setInterval(showClock, 1000)

const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {}
nlwSetup.setData(data)
nlwSetup.load()
