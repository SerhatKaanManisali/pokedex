let labels = [];
let baseStats = [];
let statsChart;


function renderStats(currentIndex) {
    let statsTabPane = document.getElementById('stats-tab-pane')
    statsTabPane.innerHTML = /*html*/`
        <canvas id="stats"></canvas>
    `;
    const ctx = document.getElementById('stats');
    statsChart = new Chart(ctx, {
        type: 'radar',
        data: getData(currentIndex),
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
                pointHoverBorderColor: 'rgb(255, 99, 132)',
                borderWidth: 3
            }
        ]
    }

    return data;
}


function getOptions() {
    let options = {
        plugins: {
            legend: {
                display: false
            },
            responsive: true
        }
    }
    return options;
}


function resetChart() {
    let statsTabPane = document.getElementById('stats-tab-pane')
    if (statsChart) {
        statsChart.destroy();
        statsTabPane.innerHTML = '';
        labels = [];
        baseStats = [];
    }
}