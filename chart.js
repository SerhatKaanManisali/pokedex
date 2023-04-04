let labels = [];
let baseStats = [];


function renderStats(j) {
    const ctx = document.getElementById('stats');
    new Chart(ctx, {
        type: 'radar',
        data: getData(j),
        options: getOptions(),
    });
}


function getData(j) {
    let stats = pokemons[j]['stats'];

    for (let s = 0; s < stats.length; s++) {
        const label = stats[s]['stat']['name'];
        labels.push(label);
        const stat = stats[s]['base_stat'];
        baseStats.push(stat);
    }

    let data = {
        labels: labels,
        datasets: [
            {
                label: '',
                data: baseStats,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }
        ]
    }

    return data;
}


function getOptions() {
    let options

    return options;
}