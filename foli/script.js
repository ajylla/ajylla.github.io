function fetch_and_display(lineref, stopref) {
    fetch("https://data.foli.fi/siri/vm")
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json()
    })
    .then(data => {
        delays = extract_delays(data, lineref, stopref);
        const linetext = document.getElementById("linetext");
        const resulttext = document.getElementById("resulttext");
        linetext.value = lineref;
        resulttext.value = delays[1]/60;
    })
}

function extract_delays(data, lineref, stopref) {
    const delays = [];

    let n = 0;
    for (const vehicleId in data.result.vehicles) {
        const vehicle = data.result.vehicles[vehicleId];
        if (vehicle && vehicle.lineref === lineref && vehicle.delaysecs !== undefined) {
            delays.push(vehicle.delaysecs);
            n++;
        }
        if (vehicle.onwardcalls && stopref) {
            for (const onwardcall of vehicle.onwardcalls) {
                if (onwardcall && onwardcall.stoppointref === stopref) {
                    console.log(onwardcall);
                    const time = new Date(onwardcall.aimedarrivaltime * 1000);
                    console.log(time.toString());
                    const timeexpt = new Date(onwardcall.expectedarrivaltime * 1000);
                    console.log(timeexpt.toString());
                    console.log(vehicle.delaysecs/60)

                    const resdiv = document.getElementById("resdiv");
                    resdiv.innerHTML = resdiv.innerHTML + `${lineref} -> ${stopref} @ ${time.toString()}:<br />Odotettu aika: ${timeexpt.toString()}, myöhässä ${vehicle.delaysecs/60} minuuttia.<br />----------<br />`
                }
            }
        }
    }
    const sum = delays.reduce((partial, a) => partial + a, 0);
    return [delays, sum/n];
}

function main() {
    const lineref = document.getElementById("lineinput").value;
    const stopref = document.getElementById("stopinput").value;
    fetch_and_display(lineref, stopref);
}
