// Utilites
const $ = (sel) => document.querySelector(sel)

const get = endpoint => fetch(endpoint).then(res => res.json())
const put = endpoint => fetch(endpoint, { method: 'PUT' }).then(res => res.json())
const del = endpoint => fetch(endpoint, { method: 'DELETE' }).then(res => res.json())
const post = (endpoint, data) => fetch(endpoint, {
  method: 'POST',
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(data)
}).then(res => res.json())
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
  $('#timer').innerHTML = `Timer set at: ${parseCronTime(appState.schedule_time)}`
  $('#on-btn').disabled = appState.enable === 'true'
  $('#off-btn').disabled = appState.enable !== 'true'
}

const parseCronTime = (cronTime) => {
  if (cronTime) {
    return `${cronTime.split(' ')[1]}:${cronTime.split(' ')[0]}`  
  } else {
    return 'off'
  }
}

const toCronTime = time => (
  `${time.split(':')[1]} ${time.split(':')[0]} * * *`
)

const updateStatus = () => {
  get('status')
    .then(data => {
      appState = { ...appState, ...data }
      render()
    })
}

const turnOn = () => {
  put("enabled").then(resJSON => {
    // TODO: return status here for better update conditions
    appState.enable = 'true'
    render()
  })
}

const turnOff = () => {
  del("enabled").then(resJSON => {
    appState.enable = 'false'
    render()
  })
}

const updateTarget = () => {
  const temperature = $('#newTarget').value
  patch("temperature", { temperature }).then(resJSON => {
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

const onKeydown2 = e => {
  if (e.which === 13) {
    updateOnTime()
  }
}

const updateOnTime = () => {
  const time = $('#newTime').value
  post("schedule", { onTime: time }).then(resJSON => {
    appState.schedule_time = toCronTime(time)
    render()
  })
}

const clearTime = () => {
  del("schedule").then(resJSON => {
    $('#newTime').value = ''
    appState.schedule_time = ''
    render()
  })
}

updateStatus()
setInterval(() => updateStatus(), 10000)
