function plot(data, chart, title) {
    const dates = data.prices.map(price => price.date);
    const prices = data.prices.map(price => (price.value/10).toFixed(3));
    const xlabels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7",
                     "7-8", "8-9", "9-10", "10-11", "11-12", "12-13",
                     "13-14", "14-15", "15-16", "16-17", "17-18",
                     "18-19", "19-20", "20-21", "21-22", "22-23", "23-00"]
    const barColors = "black";

    const chartelement = document.getElementById(chart);

    const chartobj = new Chart(chartelement, {
        type: "bar",
        data: {
            labels: xlabels,
            datasets: [{
                backgroundColor: barColors,
                data: prices,
                label: "Hinta [snt/kWh]"
            }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: title,
            },
            animation: {duration: 0},
        }
    });
};

function show(id) {
    document.getElementById(id).style.display = "block";
};

function hide(id) {
    document.getElementById(id).style.display = "none";
};
