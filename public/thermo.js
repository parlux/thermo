status_list = Object.freeze({"true":"ON", "false":"OFF"})

const getStatus = () => {
  return fetch("http://localhost:3200/status").then(res => res.json())
}

const foo = getStatus()
  .then(json => {
    // Do something here
    console.log(json)
  })

  // window.onload = refresh_status;

  // function on_button() {
  //     var xhttp = new XMLHttpRequest();
  //     xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //       document.getElementById("enable_status").innerHTML =
  //       this.responseText
  //     }
  //   };
  //   xhttp.open("POST", "update", true);
  //   xhttp.send("enable=1");
  // }

  // function off_button() {
  //     var xhttp = new XMLHttpRequest();
  //     xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //       document.getElementById("enable_status").innerHTML =
  //       this.responseText
  //     }
  //   };
  //   xhttp.open("POST", "update", true);
  //   xhttp.send("enable=0");
  // }

  // function update_setpoint() {
  //     var xhttp = new XMLHttpRequest();
  //     xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //       document.getElementById("target").innerHTML =
  //       this.responseText
  //     }
  //   };
  //   xhttp.open("POST", "update", true);
  //   xhttp.send("sp="+document.getElementById("new_target").value);
  // }

  // function refresh_status() {
  //     var xhttp = new XMLHttpRequest();
  //     xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //       stat = JSON.parse(this.responseText)
  //       document.getElementById("current").innerHTML = stat.temp
  //       document.getElementById("target").innerHTML = stat.sp

  //       if (stat.enabled) {
  //         document.querySelector('#on-btn').disabled = true
  //         document.querySelector('#off-btn').disabled = false
  //       } else {
  //         document.querySelector('#on-btn').disabled = false
  //         document.querySelector('#off-btn').disabled = true
  //       }
  //     }
  //   };
  //   xhttp.open("POST", "status", true);
  //   xhttp.send();
  // }