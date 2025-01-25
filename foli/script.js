function fetch_and_display(lineref) {
    fetch("https://data.foli.fi/siri/vm")
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json()
    })
    .then(data => {
        delays = extract_delays(data, lineref);
        const linetext = document.getElementById("linetext");
        const resulttext = document.getElementById("resulttext");
        linetext.value = lineref;
        resulttext.value = delays[1]/60;
    })
}

function extract_delays(data, lineref) {
    const delays = [];

    let n = 0;
    for (const vehicleId in data.result.vehicles) {
        const vehicle = data.result.vehicles[vehicleId];
        if (vehicle && vehicle.lineref === lineref && vehicle.delaysecs !== undefined) {
            delays.push(vehicle.delaysecs);
            n++;
        }
    }
    const sum = delays.reduce((partial, a) => partial + a, 0);
    return [delays, sum/n];
}

function main() {
    const lineref = document.getElementById("lineinput").value;
    fetch_and_display(lineref);
}
