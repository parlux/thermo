// Utilites
const $ = (sel) => document.querySelector(sel)

const get = endpoint => fetch(endpoint).then(res => res.json())
const put = endpoint => fetch(endpoint, { method: 'PUT' }).then(res => res.json())
const del = endpoint => fetch(endpoint, { method: 'DELETE' }).then(res => res.json())
const patch = (endpoint, data) => fetch(endpoint, {
  method: 'PATCH',
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(data)
}).then(res => res.json())

// App
let appState = {}

const render = () => {
  $('#current').innerHTML = parseFloat(appState.temp).toLocaleString('en', {
    maximumFractionDigits: 1
  })
  $('#target').innerHTML = parseFloat(appState.sp).toLocaleString('en', {
    maximumFractionDigits: 1
  })
  $('#timer').innerHTML = appState.schedule_time
  $('#on-btn').disabled = appState.enable === 'true'
  $('#off-btn').disabled = appState.enable !== 'true'
}

const updateStatus = () => {
  get('/status')
    .then(data => {
      appState = { ...appState, ...data }
      render()
    })
}

const turnOn = () => {
  put("/enabled").then(resJSON => {
    // TODO: return status here for better update conditions
    appState.enable = 'true'
    render()
  })
}

const turnOff = () => {
  del("/enabled").then(resJSON => {
    appState.enable = 'false'
    render()
  })
}

const updateTarget = () => {
  const temperature = $('#newTarget').value
  patch("/temperature", { temperature }).then(resJSON => {
    // TODO: return the new target
    // TODO: rename temp to target
    appState.sp = temperature
    render()
  })
}

const onKeydown = e => {
  if (e.which === 13) {
    updateTarget()
  }
}

updateStatus()
setInterval(() => updateStatus(), 10000)